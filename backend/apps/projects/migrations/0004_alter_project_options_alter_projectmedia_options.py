# Generated by Django 4.2.9 on 2024-01-18 20:23

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("projects", "0003_alter_projectmedia_project"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="project",
            options={"verbose_name_plural": "Projects"},
        ),
        migrations.AlterModelOptions(
            name="projectmedia",
            options={"verbose_name_plural": "Project Media"},
        ),
    ]
