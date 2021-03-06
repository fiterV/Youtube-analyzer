# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-12 11:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Token',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('api_key', models.CharField(blank=True, max_length=30)),
                ('owner', models.CharField(max_length=20)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.URLField()),
                ('title', models.CharField(max_length=200)),
                ('channel', models.CharField(max_length=200)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('api_token', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='analyzer.Token')),
            ],
        ),
    ]
