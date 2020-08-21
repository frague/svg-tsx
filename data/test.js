export const primitives = [
	{
		'title': 'Subinterface',
		'tags': [],
		'node': '',
		'parameters': {
			'security_zone': '',
			'vlan_id': ''
		},
		'inputTypes': ['interface'],
		'outputTypes': ['subinterface'],
	},
	{
		'title': 'Attach VLAN',
		'tags': [],
		'node': '',
		'parameters': {
			'vlan_id': '',
			'tagged/untagged': ''
		},
		'inputTypes': ['interface'],
		'outputTypes': null,
	},
	{
		'title': 'Address type',
		'tags': [],
		'node': '',
		'parameters': {
			'IPv4': '',
			'IPv6': ''
		},
		'inputTypes': ['interface', 'subinterface'],
		'outputTypes': ['routable interface'],
	},
	{
		'title': 'BGP unnumbered',
		'tags': [],
		'node': '',
		'parameters': {
			'timeout': ''
		},
		'inputTypes': ['routable interface'],
		'outputTypes': ['routing session'],
	},
	{
		'title': 'Routing policy',
		'tags': [],
		'node': '',
		'parameters': {
			'import/export': ''
		},
		'inputTypes': ['routing session'],
		'outputTypes': ['routing policy'],
	},
	{
		'title': 'Freetype',
		'tags': [],
		'node': '',
		'parameters': {
			'import/export': ''
		},
		'inputTypes': null,
		'inputIsFlexible': true,
		'outputTypes': null,
		'outputIsFlexible': true,
	},
]