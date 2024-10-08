{
	"version":"LAYASCENE3D:02",
	"data":{
		"type":"Scene3D",
		"props":{
			"name":"FightScene",
			"ambientColor":[
				0.7216981,
				0.8044366,
				1
			],
			"reflectionDecodingFormat":0,
			"reflection":"Assets/Scenes/FightSceneGIReflection.ltcb.ls",
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
					"path":"Assets/Scenes/FightScene/Lightmap-0_comp_light.png"
				}
			],
			"enableFog":false,
			"fogStart":20,
			"fogRange":160,
			"fogColor":[
				0.6650944,
				0.8621451,
				1
			]
		},
		"child":[
			{
				"type":"Sprite3D",
				"instanceID":0,
				"props":{
					"name":"MainCamera",
					"active":true,
					"isStatic":false,
					"layer":0,
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
						"type":"Camera",
						"instanceID":1,
						"props":{
							"name":"FightCamera",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								2.7,
								7.37,
								18.5
							],
							"rotation":[
								0.1435388,
								-0.2619153,
								-0.03942669,
								-0.9535421
							],
							"scale":[
								1,
								1,
								1
							],
							"clearFlag":0,
							"orthographic":false,
							"orthographicVerticalSize":3.18,
							"fieldOfView":60,
							"enableHDR":true,
							"nearPlane":0.3,
							"farPlane":200,
							"viewport":[
								0,
								0,
								1,
								1
							],
							"clearColor":[
								0,
								0.1100985,
								0.2264151,
								1
							]
						},
						"components":[],
						"child":[]
					}
				]
			},
			{
				"type":"DirectionLight",
				"instanceID":2,
				"props":{
					"name":"MainLight",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						0,
						13.81,
						6.95
					],
					"rotation":[
						-0.009076766,
						0.4399471,
						0.8979641,
						-0.004982404
					],
					"scale":[
						1,
						1,
						1
					],
					"intensity":0.2,
					"lightmapBakedType":0,
					"color":[
						0.9056604,
						0.8615166,
						0.7732289
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"Sprite3D",
				"instanceID":3,
				"props":{
					"name":"MainScene2",
					"active":true,
					"isStatic":true,
					"layer":0,
					"position":[
						-32.9,
						0,
						-28.2
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
						"instanceID":4,
						"props":{
							"name":"1",
							"active":true,
							"isStatic":true,
							"layer":0,
							"position":[
								0.5524388,
								0,
								0.8609234
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								2.0037,
								2.0037,
								0.8136496
							],
							"meshPath":"Assets/Arts/Modles/MainScene2_New-1.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.6956515,
								0.6956515,
								-0.04347571,
								-0.04347571
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/MainScene2_2.lmat"
								}
							]
						},
						"components":[],
						"child":[
							{
								"type":"MeshSprite3D",
								"instanceID":5,
								"props":{
									"name":"2",
									"active":true,
									"isStatic":true,
									"layer":0,
									"position":[
										0,
										0,
										32.67043
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
									],
									"meshPath":"Assets/Arts/Modles/MainScene2_New-2.lm",
									"lightmapIndex":0,
									"lightmapScaleOffset":[
										0.1531082,
										0.1531082,
										0.6300797,
										-0.009568711
									],
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/MainScene2_6.lmat"
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
						"instanceID":6,
						"props":{
							"name":"Plane1",
							"active":true,
							"isStatic":true,
							"layer":0,
							"position":[
								0,
								0,
								-2.283
							],
							"rotation":[
								0,
								0.7071068,
								0.7071068,
								0
							],
							"scale":[
								1369.003,
								1446.008,
								1549.601
							],
							"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.5795287,
								0.5795287,
								-0.03622055,
								0.4132283
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/MainScene2_1.lmat"
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
							"name":"3",
							"active":true,
							"isStatic":true,
							"layer":0,
							"position":[
								-27.7,
								0,
								-50.2
							],
							"rotation":[
								0.5547237,
								-0.2641461,
								-0.1914361,
								-0.7654153
							],
							"scale":[
								1.187289,
								1.187289,
								1.187289
							],
							"meshPath":"Assets/Arts/Modles/MainScene2_New-3.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.05953639,
								0.05953639,
								0.7893019,
								0.07768192
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/MainScene2_6.lmat"
								}
							]
						},
						"components":[],
						"child":[
							{
								"type":"MeshSprite3D",
								"instanceID":8,
								"props":{
									"name":"Plane1",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										-3.49,
										-2.04,
										13.84
									],
									"rotation":[
										0.6597254,
										0.1989738,
										0.2092563,
										-0.6938182
									],
									"scale":[
										75.59422,
										75.59422,
										75.59422
									],
									"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/MainScene2_4.lmat"
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
									"name":"Plane1 (1)",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										-3.73,
										-2.15,
										16.08
									],
									"rotation":[
										0.6597254,
										0.1989738,
										0.2092563,
										-0.6938182
									],
									"scale":[
										75.59422,
										75.59422,
										75.59422
									],
									"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/MainScene2_4.lmat"
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
									"name":"Plane1 (2)",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										-1.04,
										-2.04,
										13.84
									],
									"rotation":[
										0.6597254,
										0.1989738,
										0.2092563,
										-0.6938182
									],
									"scale":[
										75.59422,
										75.59422,
										75.59422
									],
									"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/MainScene2_4.lmat"
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
									"name":"Plane1 (3)",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										-1.28,
										-2.15,
										16.08
									],
									"rotation":[
										0.6597254,
										0.1989738,
										0.2092563,
										-0.6938182
									],
									"scale":[
										75.59422,
										75.59422,
										75.59422
									],
									"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/MainScene2_4.lmat"
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
									"name":"Plane1 (4)",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										1.39,
										-2.04,
										13.84
									],
									"rotation":[
										0.6597254,
										0.1989738,
										0.2092563,
										-0.6938182
									],
									"scale":[
										75.59422,
										75.59422,
										75.59422
									],
									"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/MainScene2_4.lmat"
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
									"name":"Plane1 (5)",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										1.15,
										-2.15,
										16.08
									],
									"rotation":[
										0.6597254,
										0.1989738,
										0.2092563,
										-0.6938182
									],
									"scale":[
										75.59422,
										75.59422,
										75.59422
									],
									"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/MainScene2_4.lmat"
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
									"name":"Plane1 (6)",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										3.58,
										-2.04,
										13.84
									],
									"rotation":[
										0.6597254,
										0.1989738,
										0.2092563,
										-0.6938182
									],
									"scale":[
										75.59422,
										75.59422,
										75.59422
									],
									"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/MainScene2_4.lmat"
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
									"name":"Plane1 (7)",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										3.34,
										-2.15,
										16.08
									],
									"rotation":[
										0.6597254,
										0.1989738,
										0.2092563,
										-0.6938182
									],
									"scale":[
										75.59422,
										75.59422,
										75.59422
									],
									"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/MainScene2_4.lmat"
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
									"name":"Plane1 (8)",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										2.97,
										-1.91,
										11.34
									],
									"rotation":[
										0.6597254,
										0.1989738,
										0.2092563,
										-0.6938182
									],
									"scale":[
										75.59422,
										75.59422,
										75.59422
									],
									"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/MainScene2_4.lmat"
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
									"name":"Plane1 (9)",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										0.7,
										-1.91,
										11.34
									],
									"rotation":[
										0.6597254,
										0.1989738,
										0.2092563,
										-0.6938182
									],
									"scale":[
										75.59422,
										75.59422,
										75.59422
									],
									"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/MainScene2_4.lmat"
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
									"name":"Plane1 (10)",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										-1.27,
										-1.91,
										11.34
									],
									"rotation":[
										0.6597254,
										0.1989738,
										0.2092563,
										-0.6938182
									],
									"scale":[
										75.59422,
										75.59422,
										75.59422
									],
									"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/MainScene2_4.lmat"
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
									"name":"Plane1 (11)",
									"active":true,
									"isStatic":false,
									"layer":0,
									"position":[
										-3.53,
										-1.91,
										11.34
									],
									"rotation":[
										0.6597254,
										0.1989738,
										0.2092563,
										-0.6938182
									],
									"scale":[
										75.59422,
										75.59422,
										75.59422
									],
									"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/MainScene2_4.lmat"
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
						"instanceID":20,
						"props":{
							"name":"4",
							"active":true,
							"isStatic":true,
							"layer":0,
							"position":[
								-9.360001,
								5.33,
								-46.8
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								0.6756039,
								0.6756039,
								0.6756039
							],
							"meshPath":"Assets/Arts/Modles/MainScene2_New-4.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.07277635,
								0.07277635,
								0.8700175,
								-0.004548355
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/MainScene2_6.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":21,
						"props":{
							"name":"4 (1)",
							"active":true,
							"isStatic":true,
							"layer":0,
							"position":[
								12.6,
								5.33,
								-46.8
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								0.6756039,
								0.6756039,
								0.6756039
							],
							"meshPath":"Assets/Arts/Modles/MainScene2_New-4.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.07277635,
								0.07277635,
								0.6351001,
								0.1492602
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/MainScene2_6.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":22,
						"props":{
							"name":"4 (2)",
							"active":true,
							"isStatic":true,
							"layer":0,
							"position":[
								-25.31255,
								5.33,
								-11.04079
							],
							"rotation":[
								0.5,
								-0.5,
								-0.5,
								-0.5
							],
							"scale":[
								0.6756039,
								0.6756039,
								0.6756039
							],
							"meshPath":"Assets/Arts/Modles/MainScene2_New-4.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.07277635,
								0.07277635,
								0.7884746,
								-0.004548355
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/MainScene2_6.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":23,
						"props":{
							"name":"4 (3)",
							"active":true,
							"isStatic":true,
							"layer":0,
							"position":[
								-25.5,
								5.33,
								-33
							],
							"rotation":[
								0.5,
								-0.5,
								-0.5,
								-0.5
							],
							"scale":[
								0.6756039,
								0.6756039,
								0.6756039
							],
							"meshPath":"Assets/Arts/Modles/MainScene2_New-4.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.07277635,
								0.07277635,
								0.6351001,
								0.2306631
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/MainScene2_6.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":24,
						"props":{
							"name":"Plane1 (12)",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								0.4,
								20.2,
								-32.8
							],
							"rotation":[
								0.9344864,
								0.2752113,
								-0.1406518,
								-0.1766664
							],
							"scale":[
								384.9877,
								384.9876,
								384.9877
							],
							"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/MainScene2_5.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":25,
						"props":{
							"name":"Plane1 (13)",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								13.3,
								20.2,
								-32.8
							],
							"rotation":[
								0.9198239,
								0.3208271,
								-0.1491684,
								-0.1695369
							],
							"scale":[
								296.4059,
								296.4058,
								296.4059
							],
							"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/MainScene2_5.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":26,
						"props":{
							"name":"Plane1 (14)",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								-17,
								21.9,
								-32.8
							],
							"rotation":[
								0.9198239,
								0.3208271,
								-0.1491684,
								-0.1695369
							],
							"scale":[
								296.4059,
								296.4058,
								296.4059
							],
							"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/MainScene2_5.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":27,
						"props":{
							"name":"Plane1 (15)",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								-28.3,
								21.1,
								-20.5
							],
							"rotation":[
								0.9198239,
								0.3208271,
								-0.1491684,
								-0.1695369
							],
							"scale":[
								296.4059,
								296.4058,
								296.4059
							],
							"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/MainScene2_5.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":28,
						"props":{
							"name":"Floor",
							"active":true,
							"isStatic":true,
							"layer":0,
							"position":[
								1.48,
								0.542,
								-48.21
							],
							"rotation":[
								0,
								-0.7071068,
								-0.7071068,
								0
							],
							"scale":[
								-0.482216,
								0.5,
								2.757561
							],
							"meshPath":"Assets/Arts/Modles/MainScene2-Floor.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.01105563,
								0.01105563,
								0.9554179,
								-0.0006909766
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/MainScene2_6.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":29,
						"props":{
							"name":"Floor (1)",
							"active":true,
							"isStatic":true,
							"layer":0,
							"position":[
								1.47,
								0.542,
								-48.21
							],
							"rotation":[
								0,
								-0.7071068,
								-0.7071068,
								0
							],
							"scale":[
								0.482216,
								0.5,
								2.757561
							],
							"meshPath":"Assets/Arts/Modles/MainScene2-Floor.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.01105563,
								0.01105563,
								0.9808085,
								0.02437838
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/MainScene2_6.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":30,
						"props":{
							"name":"Floor (2)",
							"active":true,
							"isStatic":true,
							"layer":0,
							"position":[
								-26.89,
								0.542,
								-21.81
							],
							"rotation":[
								-0.5,
								-0.5,
								-0.5,
								0.5
							],
							"scale":[
								-0.482216,
								0.5,
								2.757561
							],
							"meshPath":"Assets/Arts/Modles/MainScene2-Floor.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.01105563,
								0.01105563,
								0.9808085,
								-0.0006909766
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/MainScene2_6.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":31,
						"props":{
							"name":"Floor (3)",
							"active":true,
							"isStatic":true,
							"layer":0,
							"position":[
								-26.9,
								0.542,
								-21.81
							],
							"rotation":[
								-0.5,
								-0.5,
								-0.5,
								0.5
							],
							"scale":[
								0.482216,
								0.5,
								2.757561
							],
							"meshPath":"Assets/Arts/Modles/MainScene2-Floor.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.01105563,
								0.01105563,
								0.9554179,
								0.02437838
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/MainScene2_6.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":32,
						"props":{
							"name":"Plane1 (1)",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								-23.93,
								0.1,
								-19.634
							],
							"rotation":[
								0,
								0.7071068,
								0.7071068,
								0
							],
							"scale":[
								224.0416,
								755.4683,
								29.46961
							],
							"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Shadows1.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					},
					{
						"type":"MeshSprite3D",
						"instanceID":33,
						"props":{
							"name":"Plane1 (2)",
							"active":true,
							"isStatic":false,
							"layer":0,
							"position":[
								2.689,
								0.1,
								-43.99
							],
							"rotation":[
								0.5,
								-0.5,
								-0.5,
								-0.5
							],
							"scale":[
								217.8681,
								737.7275,
								29.46961
							],
							"meshPath":"Assets/Arts/Modles/Plane1-Plane1.lm",
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Shadows1.lmat"
								}
							]
						},
						"components":[],
						"child":[]
					}
				]
			},
			{
				"type":"Sprite3D",
				"instanceID":34,
				"props":{
					"name":"EnemyPoint",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						-4.87,
						0,
						1.61
					],
					"rotation":[
						0,
						0,
						0,
						-1
					],
					"scale":[
						2,
						2,
						2
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"Sprite3D",
				"instanceID":35,
				"props":{
					"name":"PlayerPoint",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						-4.87,
						0,
						8.82
					],
					"rotation":[
						0,
						1,
						0,
						0
					],
					"scale":[
						1.8,
						1.8,
						1.8
					]
				},
				"components":[],
				"child":[]
			},
			{
				"type":"Sprite3D",
				"instanceID":36,
				"props":{
					"name":"EnemyPoint1",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						1.91,
						0,
						-4.7
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
				"child":[]
			},
			{
				"type":"Sprite3D",
				"instanceID":37,
				"props":{
					"name":"PlayerPoint1",
					"active":true,
					"isStatic":false,
					"layer":0,
					"position":[
						-6.75,
						0,
						14.37
					],
					"rotation":[
						0,
						1,
						0,
						0
					],
					"scale":[
						1,
						1,
						1
					]
				},
				"components":[],
				"child":[]
			}
		]
	}
}