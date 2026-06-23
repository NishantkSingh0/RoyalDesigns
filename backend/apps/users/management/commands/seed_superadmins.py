from django.core.management.base import BaseCommand
from ...models import User
from decouple import config


class Command(BaseCommand):
    help = "Create default Super Admin accounts"

    USERS = [
        {
            "email": "nishant@royaldesigns.org",
            "full_name": "Nishant Kumar",
            "password": "9917760469@Ni",
            "phone": "9917760469",
        },
        {
            "email": "sahil@royaldesigns.org",
            "full_name": "Sahil Siddiqui",
            "password": "RoyalDesigns@8447302339",
            "phone": "8447302339",
        },
    ]

    def handle(self, *args, **options):
        for data in self.USERS:
            user, created = User.objects.get_or_create(
                email=data["email"],
                defaults={
                    "full_name": data["full_name"],
                    "phone": data["phone"],
                    "role": "admin",      # Change if your model uses another value
                    "is_staff": True,
                    "is_superuser": True,
                    "is_active": True,
                    "must_change_password": False,
                },
            )

            if created:
                user.set_password(data["password"])
                user.save()

                self.stdout.write(
                    self.style.SUCCESS(
                        f"✓ Created {user.email}"
                    )
                )
            else:
                user.full_name = data["full_name"]
                user.phone = data["phone"]
                user.role = "superadmin"
                user.is_staff = True
                user.is_superuser = True
                user.is_active = True
                user.must_change_password = False
                user.set_password(data["password"])
                user.save()

                self.stdout.write(
                    self.style.WARNING(
                        f"↻ Updated {user.email}"
                    )
                )

        self.stdout.write(
            self.style.SUCCESS("\nSuper Admin seeding completed.")
        )