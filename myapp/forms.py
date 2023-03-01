from django import forms
from .models import Account, Item
from rest_framework import serializers


class Accountserializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['name', 'gender', 'age', 'place', 'prefix', 'phone', 'items']


class Itemsserializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['item_name', 'size', 'animal', 'category', 'description', 'image']



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
