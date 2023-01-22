import * as cdk from 'aws-cdk-lib';
import * as kinesis from 'aws-cdk-lib/aws-kinesis';
import * as kinesisAnalytics from 'aws-cdk-lib/aws-kinesisanalytics';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as dynamoDB from 'aws-cdk-lib/aws-dynamodb';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'MyStack');

// Crear un Kinesis Data Stream
const stream = new kinesis.Stream(stack, 'MyStream', {
  // Configuraciones del Data Stream
});

// Crear un Kinesis Data Analytics para analizar datos del flujo
const analytics = new kinesisAnalytics.CfnApplication(stack, 'MyAnalytics', {
  // Configuraciones del Kinesis Data Analytics
});

// Crear una función Lambda para fanout los datos
const fanoutLambda = new lambda.Function(stack, 'FanoutLambda', {
  // Configuraciones de la función Lambda
});

// Crear un topic SNS para publicar los datos
const topic = new sns.Topic(stack, 'MyTopic');

// Crear una tabla DynamoDB para almacenar los datos
const table = new dynamoDB.Table(stack, 'MyTable', {
  // Configuraciones de la tabla DynamoDB
});

// Conectar el Data Stream con el Analytics
analytics.connectToStream(stream);

// Conectar la salida del Analytics con la función Lambda
analytics.connectToLambda(fanoutLambda);

// Conectar la salida de la función Lambda con el topic SNS y la tabla DynamoDB
fanoutLambda.addEventSource(new lambda.SnsEventSource(topic));
fanoutLambda.addEventSource(new lambda.DynamoEventSource(table, {
  startingPosition: lambda.StartingPosition.TRIM_HORIZON
}));
