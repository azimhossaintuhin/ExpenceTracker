from  rest_framework.response import Response
from typing  import Union


# SuccessResponse
def SuccessResponse(data:Union[ dict| list ], status:int , key:str , message:str) -> Response:
    response =  {
        "status": True,
        "message": message
    }

    if key and  data:
        response[key] = data

    return Response(response, status=status)


# ErrorResponse
def ErrorResponse(error_message, status:int ) -> Response:
    return Response({
        "status": False,
        "message": error_message,   
    }, status=status
    )

