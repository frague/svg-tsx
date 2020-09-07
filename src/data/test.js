export const primitives = [
	{
		'id': 'ID0000001',
		'title': 'Subinterface',
		'tags': [],
		'type': 'primitive',
		'parameters': {
			'security_zone': {
				'values': ['default', 'system'],
				'value': 'system',
				'isMandatory': true,
			},
			'vlan_id': {
				'type': 'number',
				'value': 100,
				'isMandatory': true,
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
				'type': 'number',
				'isMandatory': true,
			},
			'tagged/untagged': {
				'values': ['tagged', 'untagged'],
				'isMandatory': true,
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
				'values': ['none', 'unnumbered'],
				'isMandatory': true,
			},
			'IPv6': {
				'values': ['default'],
				'isMandatory': true,
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
				'type': 'number',
				'isMandatory': true,
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
				'type': 'number',
				'isMandatory': true,
			}
		},
		'inputTypes': ['routing session'],
		'outputTypes': ['routing policy'],
	},
]