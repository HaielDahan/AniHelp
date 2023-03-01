from django.shortcuts import render, redirect
from django.http import JsonResponse
from .forms import AccountForm, Accountserializer, Itemsserializer
from .models import Account, Item
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
from django.core import serializers


@api_view(['GET', 'POST'])
def Accounts_list(request):
    if request.method =='GET':
        accounts = Account.objects.all()
        seri = Accountserializer(accounts, many=True)
        return Response(seri.data)
    elif request.method == 'POST':
        seri = Accountserializer(data=request.data)
        if seri.is_valid():
            seri.save()
            return Response(seri.data, status=status.HTTP_201_CREATED)

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
        if seri.is_valid():
            seri.save()
            return Response(seri.data)
        return Response(seri.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        account.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def Items_list(request):
    if request.method =='GET':
        items = Item.objects.all()
        print(items)
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

