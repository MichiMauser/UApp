# Generated by Django 5.1.4 on 2025-01-04 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parking_func', '0002_alter_parkingslots_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='parkingrequest',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
