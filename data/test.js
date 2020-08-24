export const primitives = [
	{
		'title': 'Subinterface',
		'tags': [],
		'type': 'primitive',
		'parameters': {
			'security_zone': {
				'values': ['default', 'system']
			},
			'vlan_id': {
				'type': 'number'
			}
		},
		'inputTypes': ['interface'],
		'outputTypes': ['subinterface'],
	},
	{
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
	// {
	// 	'title': 'Freetype',
	// 	'tags': [],
	// 	'type': 'primitive',
	// 	'parameters': {
	// 		'import/export': ''
	// 	},
	// 	'inputTypes': null,
	// 	'inputIsFlexible': true,
	// 	'outputTypes': null,
	// 	'outputIsFlexible': true,
	// },
]