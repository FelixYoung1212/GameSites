{
	"version":"LAYASCENE3D:02",
	"data":{
		"type":"Scene3D",
		"props":{
			"name":"Scene1",
			"ambientColor":[
				0.4468118,
				0.9137255,
				0.8436884
			],
			"reflectionDecodingFormat":0,
			"reflection":"Assets/Scenes/Scene1GIReflection.ltcb.ls",
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
					"path":"Assets/Scenes/Scene1/Lightmap-0_comp_light.png"
				}
			],
			"enableFog":true,
			"fogStart":28,
			"fogRange":8,
			"fogColor":[
				0.358,
				0.638,
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
									"name":"DoorR",
									"active":true,
									"isStatic":true,
									"layer":8,
									"position":[
										1.26623,
										0.7071183,
										-8.890508
									],
									"rotation":[
										0.7071068,
										0,
										0,
										-0.7071068
									],
									"scale":[
										1,
										1,
										1
									],
									"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_DoorR.lm",
									"lightmapIndex":0,
									"lightmapScaleOffset":[
										0.09324069,
										0.09324069,
										0.3159192,
										-0.005827846
									],
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/Scene/Scene1_2.lmat"
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
									"name":"DoorL",
									"active":true,
									"isStatic":true,
									"layer":8,
									"position":[
										-1.266229,
										0.7071185,
										-8.890508
									],
									"rotation":[
										0.7071068,
										0,
										0,
										-0.7071068
									],
									"scale":[
										1,
										1,
										1
									],
									"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_DoorL.lm",
									"lightmapIndex":0,
									"lightmapScaleOffset":[
										0.09324069,
										0.09324069,
										0.3159192,
										0.09426981
									],
									"enableRender":true,
									"receiveShadows":true,
									"castShadow":true,
									"materials":[
										{
											"path":"Assets/Arts/Materials/Scene/Scene1_2.lmat"
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
							"name":"Scence1_1_Floor1",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								-6.103515E-07,
								0,
								-3.021058
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_1_Floor1.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.4985763,
								0.4985763,
								-0.0311587,
								0.1975745
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_2.lmat"
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
							"name":"Scence1_1_House",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								0,
								0,
								-8.896512
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_1_House.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.5343985,
								0.5343985,
								0.4432582,
								0.2120304
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_2.lmat"
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
							"name":"Scence1_2",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								3.051758E-07,
								0,
								-2.142803
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_2.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.2955339,
								0.2955339,
								-0.01847115,
								-0.01847115
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_1.lmat"
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
							"name":"Scence1_Rock2",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								4.31,
								0,
								-7.29
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_Rock2.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.02541843,
								0.02541843,
								0.2767317,
								0.04186838
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_4.lmat"
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
							"name":"Scence1_Rock3",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								-4.674541,
								0,
								-3.865906
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_Rock3.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.02711559,
								0.02711559,
								0.2766256,
								0.1786474
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_4.lmat"
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
							"name":"Scence1_Rock4",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								-3.660135,
								0,
								-7.412596
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_Rock4.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.01193059,
								0.01193059,
								0.2775747,
								0.08128559
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_4.lmat"
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
							"name":"Scence1_Rock5",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								3.805256,
								0,
								-6.311339
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_Rock5.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.01143164,
								0.01143164,
								0.3210326,
								0.1994808
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_4.lmat"
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
							"name":"Scence1_Rock6",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								3.978599,
								0,
								-4.617991
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_Rock6.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.008712643,
								0.008712643,
								0.3470814,
								0.1996508
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_4.lmat"
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
							"name":"Scence1_Rock7",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								4.548234,
								0,
								-0.62
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_Rock7.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.02209835,
								0.02209835,
								0.2769393,
								0.1433166
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_4.lmat"
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
							"name":"Scence1_Rock8",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								-0.09078148,
								0,
								3.060402
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_Rock8.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.074411,
								0.074411,
								0.7151431,
								-0.004650473
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_4.lmat"
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
							"name":"Scence1_ZhiBei1",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								5.04,
								0.35,
								-5.681929
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_ZhiBei1.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.1761642,
								0.1761642,
								0.7917778,
								-0.01101009
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_5.lmat"
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
							"name":"Scence1_ZhiBei2",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								3.09,
								4.896835,
								-7.15
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1.2924,
								1.2924,
								1.2924
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_ZhiBei2.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.236564,
								0.236564,
								-0.01478443,
								0.6734055
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_5.lmat"
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
							"name":"Scence1_ZhiBei4",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								-4.91,
								3.54,
								-1.55
							],
							"rotation":[
								0.69349,
								0.1381001,
								0.1381,
								-0.69349
							],
							"scale":[
								1.353,
								1.353,
								1.353
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_ZhiBei4.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.04989805,
								0.04989805,
								0.3934328,
								-0.003118577
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_5.lmat"
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
							"name":"Scence1_ZhiBei5",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								5.025604,
								0,
								3.185818
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_ZhiBei5.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.05388799,
								0.05388799,
								0.7164258,
								0.07964002
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_5.lmat"
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
							"name":"Scence1_ZhiBei7",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								0,
								0,
								-8.896512
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_ZhiBei7.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.07316046,
								0.07316046,
								0.4525252,
								-0.004572977
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_5.lmat"
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
							"name":"Scence1_ZhiBei8",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								-1.39,
								7.52,
								-6.32
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_ZhiBei8.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.009878593,
								0.009878593,
								0.3704461,
								0.1995779
							],
							"enableRender":true,
							"receiveShadows":false,
							"castShadow":false,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_5.lmat"
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
							"name":"Scence1_ZhiBei9",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								0,
								0,
								-8.896512
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_ZhiBei9.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.07245374,
								0.07245374,
								0.4525695,
								0.06669852
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_5.lmat"
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
							"name":"Scence1_ZhiWu4",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								5.025604,
								0,
								3.185818
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_ZhiWu4.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.1865349,
								0.1865349,
								0.2144505,
								0.6765329
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_3.lmat"
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
							"name":"Scence1_ZhiWu5",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								-1.73,
								-0.007348632,
								2.1
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_ZhiWu5.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.04856857,
								0.04856857,
								0.3935159,
								0.05727433
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_3.lmat"
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
							"name":"Scence1_ZhiWu6",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								2.04,
								-0.06612133,
								1.35
							],
							"rotation":[
								0.6783239,
								0.1996918,
								0.1996918,
								-0.6783239
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_ZhiWu6.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.05010492,
								0.05010492,
								0.4539665,
								0.148662
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_3.lmat"
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
							"name":"Scence1_ZhiWu7",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								3.861,
								0.540737,
								-3.415
							],
							"rotation":[
								0.1692144,
								0.6865614,
								0.6865614,
								-0.1692144
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_ZhiWu7.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.03070896,
								0.03070896,
								0.2764009,
								-0.001919393
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_3.lmat"
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
							"name":"Scence1_ZhiWu8",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								-1.646,
								0,
								3.42
							],
							"rotation":[
								-0.02610355,
								-0.7066248,
								-0.7066248,
								0.02610355
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_ZhiWu8.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.1837311,
								0.1837311,
								0.5261828,
								-0.01148186
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_3.lmat"
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
							"name":"Scence1_ZhiWu9",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								1.485,
								0.02963013,
								3.366
							],
							"rotation":[
								0.7071068,
								0,
								0,
								-0.7071068
							],
							"scale":[
								1,
								1,
								1
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_ZhiWu9.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.04850399,
								0.04850399,
								0.39352,
								0.1167799
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_3.lmat"
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
							"name":"Scence1_ZhiBei4 (1)",
							"active":true,
							"isStatic":true,
							"layer":8,
							"position":[
								5.13,
								2.35,
								-1.01
							],
							"rotation":[
								0.69349,
								0.1381001,
								0.1381,
								-0.69349
							],
							"scale":[
								1.353,
								1.353,
								1.353
							],
							"meshPath":"Assets/Arts/Modles/Scene1_1-Scence1_ZhiBei4.lm",
							"lightmapIndex":0,
							"lightmapScaleOffset":[
								0.02494903,
								0.02494903,
								0.276761,
								0.105171
							],
							"enableRender":true,
							"receiveShadows":true,
							"castShadow":true,
							"materials":[
								{
									"path":"Assets/Arts/Materials/Scene/Scene1_5.lmat"
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