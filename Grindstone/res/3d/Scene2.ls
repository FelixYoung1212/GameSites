{
	"version":"LAYASCENE3D:02",
	"data":{
		"type":"Scene3D",
		"props":{
			"name":"Scene2",
			"ambientColor":[
				0.5740922,
				0.8913035,
				0.9150943
			],
			"reflectionDecodingFormat":0,
			"reflection":"Assets/Scenes/Scene2GIReflection.ltcb.ls",
			"reflectionIntensity":1,
			"ambientMode":0,
			"ambientSphericalHarmonicsIntensity":1,
			"lightmaps":[
				{
					"constructParams":[
						512,
						512,
						1,
						false
					],
					"propertyParams":{
						"filterMode":1,
						"wrapModeU":1,
						"wrapModeV":1,
						"anisoLevel":3
					},
					"path":"Assets/Scenes/Scene2/Lightmap-0_comp_light.png"
				}
			],
			"enableFog":true,
			"fogStart":28,
			"fogRange":8,
			"fogColor":[
				0.3726415,
				0.7474304,
				1
			]
		},
		"child":[
			{
				"type":"Sprite3D",
				"instanceID":0,
				"props":{
					"name":"Scene",
					"active":true,
					"isStatic":true,
					"layer":8,
					"position":[
						0,
						0,
						0
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						1,
						1,
						1
					]
				},
				"components":[],
				"child":[
					{
						"type":"Sprite3D",
						"instanceID":1,
						"props":{
							"name":"Door",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								0,
								0,
								0
							],
							"rotation":[
								0,
								0,
								0,
								-1
							],
							"scale":[
								1,
								1,
								1
							]
						},
						"components":[],
						"child":[
							{
								"type":"MeshSprite3D",
								"instanceID":2,
								"props":{
									"name":"Scene1_DoorL",
									"active":true,
									"isStatic":true,
									"layer":8,
									"position":[
										-1.685395,
										1.95274,
										-8.90388
									],
									"rotation":[
										0.7071068,
										0,
										0,
										-0.7071068
									],
									"scale":[
										0.7088,
										0.7087999,
										0.7087999
									],
									"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_DoorL.lm",
									"lightmapIndex":0,
									"lightmapScaleOffset":[
										0.1261789,
										0.1261789,
										-0.007889655,
										0.5400565
									],
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/Scene/Scene2_1.lmat"
										}
									]
								},
								"components":[],
								"child":[]
							},
							{
								"type":"MeshSprite3D",
								"instanceID":3,
								"props":{
									"name":"Scene1_DoorR",
									"active":true,
									"isStatic":true,
									"layer":8,
									"position":[
										1.688691,
										1.95274,
										-8.903851
									],
									"rotation":[
										0.7071068,
										0,
										0,
										-0.7071068
									],
									"scale":[
										0.7088,
										0.7087999,
										0.7087999
									],
									"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_DoorR.lm",
									"lightmapIndex":0,
									"lightmapScaleOffset":[
										0.1260898,
										0.1260898,
										-0.007884086,
										0.4110059
									],
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/Scene/Scene2_1.lmat"
										}
									]
								},
								"components":[],
								"child":[]
							}
						]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":4,
						"props":{
							"name":"Scene1_Qiang1",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								0.001648,
								-0.120496,
								1.885408
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								0.7088,
								0.7088001,
								0.7088001
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Qiang1.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.2151884,
								0.2151884,
								0.1495192,
								-0.01344948
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_1.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":5,
						"props":{
							"name":"Scene1_Ground1",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								0.001935484,
								-0.120496,
								-2.997677
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								0.7088,
								0.7088001,
								0.7088001
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Ground1.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.4734373,
								0.4734373,
								0.3236751,
								0.1707249
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_2.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":6,
						"props":{
							"name":"Scene1_Ground3",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								0.001648,
								-0.120496,
								2.88
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								0.3717977,
								0.5100455,
								0.7088001
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Ground3.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.3246455,
								0.3246455,
								0.3329689,
								0.4162802
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_3.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":7,
						"props":{
							"name":"Scene1_Rock1",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								5.51,
								-0.120496,
								-7.55
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071067
							],
							"scale":[
								0.7088,
								0.7796797,
								1.256014
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Rock1.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.05875638,
								0.05875638,
								-0.003672055,
								0.3465745
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_4.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":8,
						"props":{
							"name":"Scene1_Simiao1",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								0.001648,
								-0.120496,
								-9.129344
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								0.7088,
								0.7088001,
								0.7088001
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Simiao1.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.4769151,
								0.4769151,
								0.3383558,
								0.5305236
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_1.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":9,
						"props":{
							"name":"Scene1_Tree1b",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								-1.57491,
								3.357835,
								-9.90711
							],
							"rotation":[
								0.7069538,
								0.01471032,
								0.0147103,
								-0.7069538
							],
							"scale":[
								0.7941395,
								0.7941395,
								0.5494731
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Tree1b.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.1138396,
								0.1138396,
								-0.007114901,
								0.6707141
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":false,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_5.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":10,
						"props":{
							"name":"Scene1_Tree1b",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								-4.5772,
								-0.120496,
								-2.183104
							],
							"rotation":[
								0.6565588,
								-0.2625463,
								-0.2625463,
								-0.6565588
							],
							"scale":[
								0.5670401,
								0.5670402,
								0.5670404
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Tree1b.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.1769639,
								0.1769639,
								0.7219546,
								-0.01106013
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":false,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_5.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":11,
						"props":{
							"name":"Scene1_Tree1b",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								4.715168,
								-0.120496,
								-0.07088027
							],
							"rotation":[
								0.0740836,
								0.7032152,
								0.7032152,
								-0.0740836
							],
							"scale":[
								0.5670401,
								-0.7088,
								0.56704
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Tree1b.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.1931496,
								0.1931496,
								0.1508969,
								0.1882373
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":false,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_5.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":12,
						"props":{
							"name":"Scene1_Rock1",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								-4.29,
								-0.120496,
								-7.67
							],
							"rotation":[
								-0.07224844,
								-0.7034062,
								-0.7034062,
								0.07224844
							],
							"scale":[
								-0.5712362,
								-0.7382799,
								0.7088
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Rock1.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.04312395,
								0.04312395,
								0.09347942,
								0.1952078
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_4.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":13,
						"props":{
							"name":"Scene1_Shilu1",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								-0.1255516,
								-0.120496,
								3.251121
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								0.7088,
								0.7088001,
								0.7088001
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Shilu1.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.06896324,
								0.06896324,
								-0.004310424,
								0.7921709
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_2.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":14,
						"props":{
							"name":"Scene1_Rock5",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								0.3,
								-0.120496,
								-9.1
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								0.7088,
								0.7088001,
								0.7088001
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Rock5.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.09600056,
								0.09600056,
								-0.006000035,
								0.2465903
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_4.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":15,
						"props":{
							"name":"Scene1_Zhiwu2",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								-1.19,
								-0.120496,
								4.16
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1.237281,
								1.237282,
								1.237282
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Zhiwu2.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.04313598,
								0.04313598,
								-0.002695736,
								0.1952071
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_6.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":16,
						"props":{
							"name":"Scene1_Zhiwu1",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								1.68,
								-0.120496,
								3.77
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								0.7508752,
								0.7508757,
								0.7508757
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Zhiwu1.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.02157293,
								0.02157293,
								-0.001348335,
								0.1617376
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_6.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":17,
						"props":{
							"name":"Scene1_Zhiwu4",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								-1.44,
								-0.120496,
								3.06
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1.011639,
								1.01164,
								1.01164
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Zhiwu4.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.02858385,
								0.02858385,
								0.05288406,
								0.1961163
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_6.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":18,
						"props":{
							"name":"Scene1_Tree1b (1)",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								4.89,
								-0.120496,
								-4.32
							],
							"rotation":[
								0.6841472,
								-0.1787248,
								-0.1787248,
								-0.6841472
							],
							"scale":[
								0.5670401,
								-0.7088,
								0.56704
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Tree1b.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.1931496,
								0.1931496,
								0.3549985,
								-0.01207173
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":false,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_5.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":19,
						"props":{
							"name":"Scene1_Tree1b (2)",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								-2.92,
								-0.120496,
								4.26
							],
							"rotation":[
								0.6565588,
								-0.2625463,
								-0.2625463,
								-0.6565588
							],
							"scale":[
								0.5670401,
								0.5670402,
								0.5670404
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Tree1b.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.1769639,
								0.1769639,
								0.5463007,
								-0.01106013
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":false,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_5.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":20,
						"props":{
							"name":"Scene1_Tree1b (3)",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								3.75,
								1.35,
								3.82
							],
							"rotation":[
								0.451302,
								-0.5443588,
								-0.5443588,
								-0.451302
							],
							"scale":[
								0.5670401,
								0.5670402,
								0.3971494
							],
							"meshPath":"Assets/Arts/Modles/Scene2_1-Scene1_Tree1b.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.1629362,
								0.1629362,
								-0.01018341,
								-0.01018341
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":false,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene2_5.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					}
				]
			}
		]
	}
}