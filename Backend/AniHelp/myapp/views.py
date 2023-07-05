import json

from django.shortcuts import render, redirect
from django.http import JsonResponse
from .forms import AccountForm, Accountserializer, Itemsserializer, RegisterSerializer, LoginSerializer
from .models import Account, Item
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
from django.core import serializers
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from rest_framework import status



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
def Accounts_detail(request, id):
    try:
        account = Account.objects.get(pk=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        seri = Accountserializer(account)
        return Response(seri.data)
    elif request.method == 'PUT':
        seri = Accountserializer(account, data=request.data)
        print(seri.is_valid())
        if seri.is_valid():
            seri.save()
            return Response(seri.data)
        return Response(seri.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        account.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def Items_list(request):
    if request.method=='POST':
        seri = Itemsserializer(data=request.data)
        if seri.is_valid():
            seri.save()
            return Response(seri.data, status=status.HTTP_201_CREATED)
    if request.method =='GET':
        items = Item.objects.all()
        seri = Itemsserializer(items, many=True)
        return Response(seri.data)


@api_view(['GET', 'PUT', 'DELETE'])
def Items_detail(request, name):
    try:
        item = Item.objects.get(item_name=name)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        seri = Itemsserializer(item)
        return Response(seri.data)
    elif request.method == 'PUT':
        seri = Itemsserializer(item, data=request.data)
        if seri.is_valid():
            seri.save()
            return Response(seri.data)
        return Response(seri.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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

