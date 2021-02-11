import sys
from argparse import ArgumentParser
from typing import Any

from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError

from zerver.lib.domains import validate_domain
from zerver.lib.management import CommandError, ZulipBaseCommand
from zerver.models import RealmDomain, get_realm_domains


class Command(ZulipBaseCommand):
    help = """Manage domains for the specified realm"""

    def add_arguments(self, parser: ArgumentParser) -> None:
        parser.add_argument('--op',
                            default="show",
                            help='What operation to do (add, show, remove).')
        parser.add_argument('--allow-subdomains',
                            action="store_true",
                            help='Whether subdomains are allowed or not.')
        parser.add_argument('domain', metavar='<domain>', nargs='?',
                            help="domain to add or remove")
        self.add_realm_args(parser, True)

    def handle(self, *args: Any, **options: str) -> None:
        realm = self.get_realm(options)
        assert realm is not None  # Should be ensured by parser
        if options["op"] == "show":
            print(f"Domains for {realm.string_id}:")
            for realm_domain in get_realm_domains(realm):
                if realm_domain["allow_subdomains"]:
                    print(realm_domain["domain"] + " (subdomains allowed)")
                else:
                    print(realm_domain["domain"] + " (subdomains not allowed)")
            sys.exit(0)

        domain = options['domain'].strip().lower()
        try:
            validate_domain(domain)
        except ValidationError as e:
            raise CommandError(e.messages[0])
        if options["op"] == "add":
            try:
                RealmDomain.objects.create(realm=realm, domain=domain,
                                           allow_subdomains=options["allow_subdomains"])
                sys.exit(0)
            except IntegrityError:
                raise CommandError(f"The domain {domain} is already a part "
                                   "of your organization.")
        elif options["op"] == "remove":
            try:
                RealmDomain.objects.get(realm=realm, domain=domain).delete()
                sys.exit(0)
            except RealmDomain.DoesNotExist:
                raise CommandError("No such entry found!")
        else:
            self.print_help("./manage.py", "realm_domain")
            raise CommandError
