from django.db import models
from django.contrib.auth.models import User

class Item(models.Model):
    item_name = models.CharField(max_length=50)
    size = models.CharField(
        max_length=13,
        choices=[('XS', 'XS(0-3.5 kg)'), ('S', 'S(3.5-7 kg)'),
                 ('M', 'M(7-12 kg)'), ('L', 'L(12-16 kg)'),
                 ('XL', 'XL(16-20 kg)'), ('XXL', 'XXL(20-30 kg)'),
                 ('OTHER', 'OTHER(30+ kg)')],
        blank=False,
    )
    animal = models.CharField(
        max_length=3,
        choices=[('dog', 'dog'), ('cat', 'cat')],
        blank=False,
    )
    category = models.CharField(
        max_length=25,
        choices=[('toys', 'toys'), ('food and related products', 'food and related products'),
                 ('sleep', 'sleep'), ('clothing', 'clothing'),
                 ('straps', 'straps'), ('cages', 'cages')],
        blank=False,
    )
    description = models.CharField(max_length=200, blank=True)
    image = models.ImageField(blank=True, null=True, upload_to='item_images/')
    def __str__(self):
        return self.item_name



class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length= 200)
    gender = models.CharField(
        max_length=6,
        choices=[('male', 'male'), ('female', 'female')],
        blank=False,
    )
    age = models.FloatField(blank=False)
    place = models.CharField(max_length=200)
    prefix = models.CharField(
        max_length=3,
        choices=[('050', '050'), ('052', '052'),
                 ('053', '053'), ('054', '054'),
                 ('057', '057'), ('058', '058')],
        blank=False,
    )
    phone = models.CharField(max_length=7, blank=False)
    items = models.ManyToManyField(Item)

    def __str__(self):
        return self.name




