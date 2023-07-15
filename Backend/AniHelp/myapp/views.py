import json

from django.shortcuts import render, redirect
from django.http import JsonResponse
from .forms import AccountForm, Accountserializer, Itemsserializer, RegisterSerializer, LoginSerializer
from .models import Account, Item
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.request import Request

# Create your views here.
from django.core import serializers
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from rest_framework import status
from django.http import HttpResponse
from django.core.files.storage import default_storage

@api_view(['POST','GET'])
def Login_view(request):
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response({'message': 'Authentication successful','detail':request.data['username']}, status=status.HTTP_200_OK)
        else:
            print(request.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        username = request.headers.get('Authorization')
        try:
            # Try to retrieve the user based on the provided username
            user = User.objects.get(username=username)
            # Return the username or any specific information you want
            return Response({'username': user.username}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            # If user is not found, return an error response
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)




@api_view(['GET', 'POST'])
def Accounts_list(request):
    if request.method =='GET':
        accounts = Account.objects.all()
        seri = Accountserializer(accounts, many=True)
        return Response(seri.data)
    elif request.method == 'POST':
        user = {'username':request.data['username'], 'email':request.data['email'],'password':request.data['password'],
                'password2':request.data['password2']}
        seri_user = RegisterSerializer(data=user)
        if seri_user.is_valid():
            seri_user.save()
        user = User.objects.get(username=request.data['username'])
        my_account = {'user': user.id,'name':request.data['name'], 'gender':request.data['gender'],'age':request.data['age'],
                'place':request.data['place'], 'prefix':request.data['prefix'], 'phone':request.data['phone']}
        seri_account = Accountserializer(data=my_account)
        print("seri_account:", seri_account.is_valid())
        if seri_account.is_valid():
            seri_account.save()
            return Response(seri_account.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def Accounts_detail(request):
    try:
        username = request.headers.get('Authorization')
        user = User.objects.get(username=username)
        account = Account.objects.get(user=user)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        seri = Accountserializer(account)
        return JsonResponse(dict(seri.data))
    elif request.method == 'PUT':
        request.data['user'] = user.id
        seri = Accountserializer(account, data=request.data)
        if seri.is_valid():
            seri.save()
            return JsonResponse(seri.data)
        return Response(seri.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        try:
            account.delete()
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return HttpResponse(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET','POST'])
def Items_list(request):
    username = request.headers.get('Authorization')
    user = User.objects.get(username=username)
    account = Account.objects.get(user=user)
    if request.method=='POST':
        seri = Itemsserializer(data=request.data)
        if seri.is_valid():
            seri.save()
            return Response(seri.data, status=status.HTTP_201_CREATED)
    if request.method =='GET':
        # items = Item.objects.all()
        items = account.items.all()
        seri = Itemsserializer(items, many=True)
        return Response(seri.data)



@api_view(['GET', 'PUT', 'DELETE'])
def Items_detail(request):
    try:
        if request.method == 'GET':
            items = Item.objects.all()
            data = [
                {
                    'id': item.id,
                    'item_name': item.item_name,
                    'size': item.size,
                    'animal': item.animal,
                    'category': item.category,
                    'description': item.description,
                    'image': item.image,
                }
                for item in items
            ]
            return JsonResponse(data, safe=False)
        elif request.method == 'DELETE':
            item_id = request.data['items']
            try:
                for id in item_id:
                    item = Item.objects.get(id=id)
                    if item.image:
                        default_storage.delete(item.image.path)
                    item.delete()
                return HttpResponse(status=204)
            except Item.DoesNotExist:
                return HttpResponse(status=404)
        elif request.method == 'PUT':
            item_id = request.data['data']['items']
            print("item:",item_id)
            item = Item.objects.get(id=item_id['id'])
            serializer = Itemsserializer(item, data=item_id)
            if serializer.is_valid():
                serializer.save()
                return HttpResponse(status=204)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return HttpResponse(status=400)
    except:
        return HttpResponse(status=500)



# def Items_detail(request):
#     try:
#         items = Item.objects.all()  # Replace `Item` with your actual model name
#         data = [
#             {
#                 'id': item.id,
#                 'item_name': item.item_name,
#                 'size': item.size,
#                 'animal': item.animal,
#                 'category': item.category,
#                 'description': item.description,
#                 'image': item.image,
#             }
#             for item in items
#         ]
#         return Response(data)  # Return a JSON response with the item data
#     except:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    # if request.method == 'GET':
    #     seri = Itemsserializer(item)
    #     return Response(seri.data)
    # elif request.method == 'PUT':
    #     seri = Itemsserializer(item, data=request.data)
    #     if seri.is_valid():
    #         seri.save()
    #         return Response(seri.data)
    #     return Response(seri.errors, status=status.HTTP_400_BAD_REQUEST)
    # elif request.method == 'DELETE':
    #     item.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)





# @api_view(['GET', 'PUT', 'DELETE'])
# def Items_detail(request, name):
#     try:
#         item = Item.objects.get(item_name=name)
#     except:
#         return Response(status=status.HTTP_404_NOT_FOUND)
#     if request.method == 'GET':
#         seri = Itemsserializer(item)
#         return Response(seri.data)
#     elif request.method == 'PUT':
#         seri = Itemsserializer(item, data=request.data)
#         if seri.is_valid():
#             seri.save()
#             return Response(seri.data)
#         return Response(seri.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == 'DELETE':
#         item.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_category_options(request):
    options = dict(Item._meta.get_field('category').choices)
    return JsonResponse(options)


# def Accounts_list(request):
#     accounts = Account.objects.all()
#     data = serializers.serialize('json', accounts)
#     return JsonResponse({"account: ", data}, safe=False)



# def create_account(request):
#     if request.method == 'POST':
#         form = AccountForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('accounts_list')
#     else:
#         form = AccountForm()
#
#     return render(request, 'create_account.html', {'form': form})

