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
		'outputType': 'subinterface',
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
		'outputType': null,
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
		'outputType': 'routable interface',
	},
	{
		'title': 'BGP unnumbered',
		'tags': [],
		'node': '',
		'parameters': {
			'timeout': ''
		},
		'inputTypes': ['routable interface'],
		'outputType': 'routing session',
	},
	{
		'title': 'Routing policy',
		'tags': [],
		'node': '',
		'parameters': {
			'import/export': ''
		},
		'inputTypes': ['routing session'],
		'outputType': 'routing policy',
	},
]