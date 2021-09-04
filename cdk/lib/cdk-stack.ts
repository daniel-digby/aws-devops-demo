import * as cdk from "@aws-cdk/core";
import * as ecr from "@aws-cdk/aws-ecr";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as iam from "@aws-cdk/aws-iam";

export class CdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // this container repository will hold our dockerised applications to be served
        // by other aws services
        const repo = new ecr.Repository(this, "devops-demo-repository", {
            repositoryName: "devops-demo-repository",
        });

        // a Virtual Private Cloud allows for all the services we are defining to be linked together
        // maxAzs controls the maximum number of access zones to the cloud
        const vpc = new ec2.Vpc(this, "devops-demo-vpc", { maxAzs: 3 });

        // An ecs cluster is a logical grouping of tasks or services in the cloud
        const cluster = new ecs.Cluster(this, "devops-demo-cluster", {
            clusterName: "devops-demo-cluster",
            vpc: vpc,
        });

        const executionRole = new iam.Role(this, "devops-demo-execution-role", {
            assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
            roleName: "devops-demo-execution-role",
        });

        executionRole.addToPolicy(
            new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                resources: ["*"],
                actions: [
                    "ecr:GetAuthorizationToken",
                    "ecr:BatchCheckLayerAvailability",
                    "ecr:GetDownloadUrlForLayer",
                    "ecr:CompleteLayerUpload",
                    "ecr:BatchGetImage",
                    "ecs:DescribeServices",
                    "iam:PassRole",
                    "ecs:RegisterTaskDefinition",
                    "ecr:InitiateLayerUpload",
                    "ecr:UploadLayerPart",
                    "ecr:PutImage",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents",
                ],
            })
        );

        const TaskDefinition = new ecs.FargateTaskDefinition(
            this,
            "devops-demo-task-definition",
            {
                executionRole: executionRole,
                family: "devops-demo-task-definition",
            }
        );

        const container = TaskDefinition.addContainer("devops-demo", {
            image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample"),
        });

        const service = new ecs.FargateService(this, "devops-demo", {
            cluster: cluster,
            taskDefinition: TaskDefinition,
            serviceName: "devops-demo-task-definition",
        });
    }
}
