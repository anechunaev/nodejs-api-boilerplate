# DefaultApi

All URIs are relative to *http://localhost:8080/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addCreatureV1**](DefaultApi.md#addCreatureV1) | **POST** /v1/creatures | Creates new creature
[**getCreatureV1**](DefaultApi.md#getCreatureV1) | **GET** /v1/creatures/{id} | Returns information about specific living creature
[**getCreaturesV1**](DefaultApi.md#getCreaturesV1) | **GET** /v1/creatures | Returns information about all living creatures
[**updateCreatureV1**](DefaultApi.md#updateCreatureV1) | **POST** /v1/creatures/{id} | Updates specific creature info


<a name="addCreatureV1"></a>
# **addCreatureV1**
> CreatureList_v1 addCreatureV1(Creature\_v1)

Creates new creature

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **Creature\_v1** | [**Creature_v1**](../Models/Creature_v1.md)|  |

### Return type

[**CreatureList_v1**](../Models/CreatureList_v1.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="getCreatureV1"></a>
# **getCreatureV1**
> Creature_v1 getCreatureV1(id, Creature\_v1)

Returns information about specific living creature

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **UUID**| Identifier of a specific creature. | [default to null]
 **Creature\_v1** | [**Creature_v1**](../Models/Creature_v1.md)|  |

### Return type

[**Creature_v1**](../Models/Creature_v1.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="getCreaturesV1"></a>
# **getCreaturesV1**
> CreatureList_v1 getCreaturesV1(offset, limit)

Returns information about all living creatures

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | **Integer**| Sets the ID of a creature for a start of the list. By default is &#x60;0&#x60;. | [optional] [default to 0]
 **limit** | **Integer**| Sets the length of the list. By default is &#x60;100&#x60;. | [optional] [default to 100]

### Return type

[**CreatureList_v1**](../Models/CreatureList_v1.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="updateCreatureV1"></a>
# **updateCreatureV1**
> Creature_v1 updateCreatureV1(id, Creature\_v1)

Updates specific creature info

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **UUID**| Identifier of a specific creature. | [default to null]
 **Creature\_v1** | [**Creature_v1**](../Models/Creature_v1.md)|  |

### Return type

[**Creature_v1**](../Models/Creature_v1.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

