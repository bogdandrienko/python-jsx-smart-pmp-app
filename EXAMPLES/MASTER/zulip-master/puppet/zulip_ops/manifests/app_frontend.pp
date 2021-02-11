class zulip_ops::app_frontend {
  include zulip::app_frontend_base
  include zulip::profile::memcached
  include zulip::profile::rabbitmq
  include zulip::postfix_localmail
  include zulip::static_asset_compiler
  include zulip_ops::app_frontend_monitoring
  $app_packages = [# Needed for the ssh tunnel to the redis server
    'autossh',
  ]
  package { $app_packages: ensure => 'installed' }
  $default_host_domain = zulipconf('nagios', 'default_host_domain', undef)

  file { '/etc/logrotate.d/zulip':
    ensure => file,
    owner  => 'root',
    group  => 'root',
    mode   => '0644',
    source => 'puppet:///modules/zulip/logrotate/zulip',
  }

  file { '/etc/supervisor/conf.d/redis_tunnel.conf':
    ensure  => file,
    require => Package['supervisor', 'autossh'],
    owner   => 'root',
    group   => 'root',
    mode    => '0644',
    content => template('zulip_ops/supervisor/conf.d/redis_tunnel.conf.template.erb'),
    notify  => Service['supervisor'],
  }
  # Need redis_password in its own file for Nagios
  file { '/var/lib/nagios/redis_password':
    ensure  => file,
    mode    => '0600',
    owner   => 'nagios',
    group   => 'nagios',
    content => zulipsecret('secrets', 'redis_password', ''),
  }

  # Each server does its own fetching of contributor data, since
  # we don't have a way to synchronize that among several servers.
  file { '/etc/cron.d/fetch-contributor-data':
    ensure => file,
    owner  => 'root',
    group  => 'root',
    mode   => '0644',
    source => 'puppet:///modules/zulip_ops/cron.d/fetch-contributor-data',
  }
}
