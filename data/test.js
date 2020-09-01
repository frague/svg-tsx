export const primitives = [
	{
		'id': 'ID0000001',
		'title': 'Subinterface',
		'tags': [],
		'type': 'primitive',
		'parameters': {
			'security_zone': {
				'values': ['default', 'system'],
				'value': 'system'
			},
			'vlan_id': {
				'type': 'number',
				'value': 100
			}
		},
		'inputTypes': ['interface'],
		'outputTypes': ['subinterface'],
	},
	{
		'id': 'ID0000002',
		'title': 'Attach VLAN',
		'tags': [],
		'type': 'primitive',
		'parameters': {
			'vlan_id': {
				'type': 'number'
			},
			'tagged/untagged': {
				'values': ['tagged', 'untagged']
			}
		},
		'inputTypes': ['interface'],
		'outputTypes': null,
	},
	{
		'id': 'ID0000003',
		'title': 'Address type',
		'tags': [],
		'type': 'primitive',
		'parameters': {
			'IPv4': {
				'values': ['none', 'unnumbered']
			},
			'IPv6': {
				'values': ['default']
			}
		},
		'inputTypes': ['interface', 'subinterface'],
		'outputTypes': ['routable interface'],
	},
	{
		'id': 'ID0000004',
		'title': 'BGP unnumbered',
		'tags': [],
		'type': 'primitive',
		'parameters': {
			'timeout': {
				'type': 'number'
			}
		},
		'inputTypes': ['routable interface'],
		'outputTypes': ['routing session'],
	},
	{
		'id': 'ID0000005',
		'title': 'Routing policy',
		'tags': [],
		'type': 'primitive',
		'parameters': {
			'import/export': {
				'type': 'number'
			}
		},
		'inputTypes': ['routing session'],
		'outputTypes': ['routing policy'],
	},
]