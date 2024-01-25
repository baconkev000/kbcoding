# Generated by Django 4.2.9 on 2024-01-18 20:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("projects", "0002_alter_projectmedia_options_alter_projecttype_options"),
    ]

    operations = [
        migrations.AlterField(
            model_name="projectmedia",
            name="project",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, related_name="media", to="projects.project"
            ),
        ),
    ]
