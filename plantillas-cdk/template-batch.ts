// Importar las clases necesarias de AWS CDK
import * as cdk from 'aws-cdk-lib';
import * as glue from 'aws-cdk-lib/aws-glue';
import * as athena from 'aws-cdk-lib/aws-athena';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3_notifications from 'aws-cdk-lib/aws-s3-notifications';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';

// Crear una nueva aplicación CDK
const app = new cdk.App();
const stack = new cdk.Stack(app, 'MyStack');

// Crear un bucket S3 para almacenar los datos de entrada
const inputBucket = new s3.Bucket(stack, 'InputBucket', {
  // Configuraciones del bucket
});

// Crear una instancia de Glue para limpiar, transformar y cargar los datos
const glueJob = new glue.CfnJob(stack, 'GlueJob', {
  // Configuraciones del Job de Glue
});

// Crear una instancia de Athena y configurar una tabla para leer los datos
const athenaDataCatalog = new athena.CfnNamedQuery(stack, 'AthenaDataCatalog', {
  // Configuraciones del Data Catalog de Athena
});

const athenaTable = new athena.CfnTable(stack, 'AthenaTable', {
  // Configuraciones de la tabla de Athena
});

// Crear una función Lambda que se ejecute cada vez que se suba un archivo CSV a S3
const lambdaFunc = new lambda.Function(stack, 'LambdaFunc', {
  // Configuraciones de la función Lambda
});

// Crear un flujo de trabajo StepFunctions para automatizar el proceso
const workflow = new stepfunctions.Workflow(stack, 'Workflow', {
  // Configuraciones del flujo de trabajo
});

// Agregar tareas al flujo de trabajo
workflow.addTask(new tasks.LambdaInvoke(lambdaFunc));
workflow.addTask(new tasks.GlueStartJobRun(glueJob));
workflow.addTask(new tasks.AthenaStartQueryExecution(athenaNamedQuery));

// Configurar notificaciones S3 para iniciar el flujo de trabajo
const s3Notification = new s3_notifications.S3EventSource(inputBucket, {
  events: [s3.EventType.OBJECT_CREATED],
});
s3Notification.bind(workflow);



