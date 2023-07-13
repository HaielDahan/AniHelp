from django import forms
from .models import Account, Item
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if user is not None:
                return attrs
        raise serializers.ValidationError('Invalid username or password')


class Accountserializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['user','name', 'gender', 'age', 'place', 'prefix', 'phone']


class Itemsserializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id','item_name', 'size', 'animal', 'category', 'description', 'image']


class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}

        }

    def save(self):
        usr = User.objects.create_user(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'password do not match'})

        usr.set_password(password)
        usr.save()
        return usr

class AccountForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = ['name', 'gender', 'age', 'place', 'prefix', 'phone', 'items']

    # def __init__(self, *args, **kwargs):
    #     super(AccountForm, self).__init__(*args, **kwargs)
    #     self.fields['gender'].widget = forms.RadioSelect(choices=[('male', 'male'), ('female', 'female')])
    #     self.fields['prefix'].widget = forms.RadioSelect(choices=[('050', '050'), ('052', '052'), ('053', '053'), ('054', '054'), ('057', '057'), ('058', '058')])
    #
    # def clean_name(self):
    #     name = self.cleaned_data['name']
    #     if len(name) < 2:
    #         raise forms.ValidationError('name error')
    #     return name
