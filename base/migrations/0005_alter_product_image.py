# Generated by Django 3.2.5 on 2021-07-18 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_shippingaddress_city'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/placeHold.png', null=True, upload_to=''),
        ),
    ]
