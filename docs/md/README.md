# Documentation for Node.js API example

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *http://localhost:8080/api*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*DefaultApi* | [**addCreatureV1**](Apis/DefaultApi.md#addcreaturev1) | **POST** /v1/creatures | Creates new creature
*DefaultApi* | [**getCreatureV1**](Apis/DefaultApi.md#getcreaturev1) | **GET** /v1/creatures/{id} | Returns information about specific living creature
*DefaultApi* | [**getCreaturesV1**](Apis/DefaultApi.md#getcreaturesv1) | **GET** /v1/creatures | Returns information about all living creatures
*DefaultApi* | [**updateCreatureV1**](Apis/DefaultApi.md#updatecreaturev1) | **POST** /v1/creatures/{id} | Updates specific creature info


<a name="documentation-for-models"></a>
## Documentation for Models

 - [CreatureList_v1](./Models/CreatureList_v1.md)
 - [Creature_v1](./Models/Creature_v1.md)
 - [Error_v1](./Models/Error_v1.md)
 - [Error_v1_error](./Models/Error_v1_error.md)


<a name="documentation-for-authorization"></a>
## Documentation for Authorization

All endpoints do not require authorization.
