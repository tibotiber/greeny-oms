Greeny OMS uses two distinct types of policies:
- Classical sails policies verifying parameters in the request and whether they match users' session parameters.
- Role-based access control policies which are defined below.

## Role-based access control (RBAC)
Role based access control is inspired by the file rights in unix. Each user role is given a power of 2. The policy index is calculated by summing the powers of 2 of each role granted access. The powers of 2 are set as follow:
```
- manager		: 2^0 =   1
- sales			: 2^1 =   2
- purchasing		: 2^2 =   4
- quality check		: 2^3 =   8
- packing		: 2^4 =  16
- documentation		: 2^5 =  32
- accounts payable	: 2^6 =  64
- accounts receivable	: 2^7 = 128
```
The table below provides the policy name for each possible combination of RBAC:
```
policy         acc.rec.       acc.pay.       documentation  packing        qualitycheck   purchasing     sales          manager
 p_001           0              0              0              0              0              0              0              1
 p_002           0              0              0              0              0              0              1              0
 p_003           0              0              0              0              0              0              1              1
 p_004           0              0              0              0              0              1              0              0
 p_005           0              0              0              0              0              1              0              1
 p_006           0              0              0              0              0              1              1              0
 p_007           0              0              0              0              0              1              1              1
 p_008           0              0              0              0              1              0              0              0
 p_009           0              0              0              0              1              0              0              1
 p_010           0              0              0              0              1              0              1              0
 p_011           0              0              0              0              1              0              1              1
 p_012           0              0              0              0              1              1              0              0
 p_013           0              0              0              0              1              1              0              1
 p_014           0              0              0              0              1              1              1              0
 p_015           0              0              0              0              1              1              1              1
 p_016           0              0              0              1              0              0              0              0
 p_017           0              0              0              1              0              0              0              1
 p_018           0              0              0              1              0              0              1              0
 p_019           0              0              0              1              0              0              1              1
 p_020           0              0              0              1              0              1              0              0
 p_021           0              0              0              1              0              1              0              1
 p_022           0              0              0              1              0              1              1              0
 p_023           0              0              0              1              0              1              1              1
 p_024           0              0              0              1              1              0              0              0
 p_025           0              0              0              1              1              0              0              1
 p_026           0              0              0              1              1              0              1              0
 p_027           0              0              0              1              1              0              1              1
 p_028           0              0              0              1              1              1              0              0
 p_029           0              0              0              1              1              1              0              1
 p_030           0              0              0              1              1              1              1              0
 p_031           0              0              0              1              1              1              1              1
 p_032           0              0              1              0              0              0              0              0
 p_033           0              0              1              0              0              0              0              1
 p_034           0              0              1              0              0              0              1              0
 p_035           0              0              1              0              0              0              1              1
 p_036           0              0              1              0              0              1              0              0
 p_037           0              0              1              0              0              1              0              1
 p_038           0              0              1              0              0              1              1              0
 p_039           0              0              1              0              0              1              1              1
 p_040           0              0              1              0              1              0              0              0
 p_041           0              0              1              0              1              0              0              1
 p_042           0              0              1              0              1              0              1              0
 p_043           0              0              1              0              1              0              1              1
 p_044           0              0              1              0              1              1              0              0
 p_045           0              0              1              0              1              1              0              1
 p_046           0              0              1              0              1              1              1              0
 p_047           0              0              1              0              1              1              1              1
 p_048           0              0              1              1              0              0              0              0
 p_049           0              0              1              1              0              0              0              1
 p_050           0              0              1              1              0              0              1              0
 p_051           0              0              1              1              0              0              1              1
 p_052           0              0              1              1              0              1              0              0
 p_053           0              0              1              1              0              1              0              1
 p_054           0              0              1              1              0              1              1              0
 p_055           0              0              1              1              0              1              1              1
 p_056           0              0              1              1              1              0              0              0
 p_057           0              0              1              1              1              0              0              1
 p_058           0              0              1              1              1              0              1              0
 p_059           0              0              1              1              1              0              1              1
 p_060           0              0              1              1              1              1              0              0
 p_061           0              0              1              1              1              1              0              1
 p_062           0              0              1              1              1              1              1              0
 p_063           0              0              1              1              1              1              1              1
 p_064           0              1              0              0              0              0              0              0
 p_065           0              1              0              0              0              0              0              1
 p_066           0              1              0              0              0              0              1              0
 p_067           0              1              0              0              0              0              1              1
 p_068           0              1              0              0              0              1              0              0
 p_069           0              1              0              0              0              1              0              1
 p_070           0              1              0              0              0              1              1              0
 p_071           0              1              0              0              0              1              1              1
 p_072           0              1              0              0              1              0              0              0
 p_073           0              1              0              0              1              0              0              1
 p_074           0              1              0              0              1              0              1              0
 p_075           0              1              0              0              1              0              1              1
 p_076           0              1              0              0              1              1              0              0
 p_077           0              1              0              0              1              1              0              1
 p_078           0              1              0              0              1              1              1              0
 p_079           0              1              0              0              1              1              1              1
 p_080           0              1              0              1              0              0              0              0
 p_081           0              1              0              1              0              0              0              1
 p_082           0              1              0              1              0              0              1              0
 p_083           0              1              0              1              0              0              1              1
 p_084           0              1              0              1              0              1              0              0
 p_085           0              1              0              1              0              1              0              1
 p_086           0              1              0              1              0              1              1              0
 p_087           0              1              0              1              0              1              1              1
 p_088           0              1              0              1              1              0              0              0
 p_089           0              1              0              1              1              0              0              1
 p_090           0              1              0              1              1              0              1              0
 p_091           0              1              0              1              1              0              1              1
 p_092           0              1              0              1              1              1              0              0
 p_093           0              1              0              1              1              1              0              1
 p_094           0              1              0              1              1              1              1              0
 p_095           0              1              0              1              1              1              1              1
 p_096           0              1              1              0              0              0              0              0
 p_097           0              1              1              0              0              0              0              1
 p_098           0              1              1              0              0              0              1              0
 p_099           0              1              1              0              0              0              1              1
 p_100           0              1              1              0              0              1              0              0
 p_101           0              1              1              0              0              1              0              1
 p_102           0              1              1              0              0              1              1              0
 p_103           0              1              1              0              0              1              1              1
 p_104           0              1              1              0              1              0              0              0
 p_105           0              1              1              0              1              0              0              1
 p_106           0              1              1              0              1              0              1              0
 p_107           0              1              1              0              1              0              1              1
 p_108           0              1              1              0              1              1              0              0
 p_109           0              1              1              0              1              1              0              1
 p_110           0              1              1              0              1              1              1              0
 p_111           0              1              1              0              1              1              1              1
 p_112           0              1              1              1              0              0              0              0
 p_113           0              1              1              1              0              0              0              1
 p_114           0              1              1              1              0              0              1              0
 p_115           0              1              1              1              0              0              1              1
 p_116           0              1              1              1              0              1              0              0
 p_117           0              1              1              1              0              1              0              1
 p_118           0              1              1              1              0              1              1              0
 p_119           0              1              1              1              0              1              1              1
 p_120           0              1              1              1              1              0              0              0
 p_121           0              1              1              1              1              0              0              1
 p_122           0              1              1              1              1              0              1              0
 p_123           0              1              1              1              1              0              1              1
 p_124           0              1              1              1              1              1              0              0
 p_125           0              1              1              1              1              1              0              1
 p_126           0              1              1              1              1              1              1              0
 p_127           0              1              1              1              1              1              1              1
 p_128           1              0              0              0              0              0              0              0
 p_129           1              0              0              0              0              0              0              1
 p_130           1              0              0              0              0              0              1              0
 p_131           1              0              0              0              0              0              1              1
 p_132           1              0              0              0              0              1              0              0
 p_133           1              0              0              0              0              1              0              1
 p_134           1              0              0              0              0              1              1              0
 p_135           1              0              0              0              0              1              1              1
 p_136           1              0              0              0              1              0              0              0
 p_137           1              0              0              0              1              0              0              1
 p_138           1              0              0              0              1              0              1              0
 p_139           1              0              0              0              1              0              1              1
 p_140           1              0              0              0              1              1              0              0
 p_141           1              0              0              0              1              1              0              1
 p_142           1              0              0              0              1              1              1              0
 p_143           1              0              0              0              1              1              1              1
 p_144           1              0              0              1              0              0              0              0
 p_145           1              0              0              1              0              0              0              1
 p_146           1              0              0              1              0              0              1              0
 p_147           1              0              0              1              0              0              1              1
 p_148           1              0              0              1              0              1              0              0
 p_149           1              0              0              1              0              1              0              1
 p_150           1              0              0              1              0              1              1              0
 p_151           1              0              0              1              0              1              1              1
 p_152           1              0              0              1              1              0              0              0
 p_153           1              0              0              1              1              0              0              1
 p_154           1              0              0              1              1              0              1              0
 p_155           1              0              0              1              1              0              1              1
 p_156           1              0              0              1              1              1              0              0
 p_157           1              0              0              1              1              1              0              1
 p_158           1              0              0              1              1              1              1              0
 p_159           1              0              0              1              1              1              1              1
 p_160           1              0              1              0              0              0              0              0
 p_161           1              0              1              0              0              0              0              1
 p_162           1              0              1              0              0              0              1              0
 p_163           1              0              1              0              0              0              1              1
 p_164           1              0              1              0              0              1              0              0
 p_165           1              0              1              0              0              1              0              1
 p_166           1              0              1              0              0              1              1              0
 p_167           1              0              1              0              0              1              1              1
 p_168           1              0              1              0              1              0              0              0
 p_169           1              0              1              0              1              0              0              1
 p_170           1              0              1              0              1              0              1              0
 p_171           1              0              1              0              1              0              1              1
 p_172           1              0              1              0              1              1              0              0
 p_173           1              0              1              0              1              1              0              1
 p_174           1              0              1              0              1              1              1              0
 p_175           1              0              1              0              1              1              1              1
 p_176           1              0              1              1              0              0              0              0
 p_177           1              0              1              1              0              0              0              1
 p_178           1              0              1              1              0              0              1              0
 p_179           1              0              1              1              0              0              1              1
 p_180           1              0              1              1              0              1              0              0
 p_181           1              0              1              1              0              1              0              1
 p_182           1              0              1              1              0              1              1              0
 p_183           1              0              1              1              0              1              1              1
 p_184           1              0              1              1              1              0              0              0
 p_185           1              0              1              1              1              0              0              1
 p_186           1              0              1              1              1              0              1              0
 p_187           1              0              1              1              1              0              1              1
 p_188           1              0              1              1              1              1              0              0
 p_189           1              0              1              1              1              1              0              1
 p_190           1              0              1              1              1              1              1              0
 p_191           1              0              1              1              1              1              1              1
 p_192           1              1              0              0              0              0              0              0
 p_193           1              1              0              0              0              0              0              1
 p_194           1              1              0              0              0              0              1              0
 p_195           1              1              0              0              0              0              1              1
 p_196           1              1              0              0              0              1              0              0
 p_197           1              1              0              0              0              1              0              1
 p_198           1              1              0              0              0              1              1              0
 p_199           1              1              0              0              0              1              1              1
 p_200           1              1              0              0              1              0              0              0
 p_201           1              1              0              0              1              0              0              1
 p_202           1              1              0              0              1              0              1              0
 p_203           1              1              0              0              1              0              1              1
 p_204           1              1              0              0              1              1              0              0
 p_205           1              1              0              0              1              1              0              1
 p_206           1              1              0              0              1              1              1              0
 p_207           1              1              0              0              1              1              1              1
 p_208           1              1              0              1              0              0              0              0
 p_209           1              1              0              1              0              0              0              1
 p_210           1              1              0              1              0              0              1              0
 p_211           1              1              0              1              0              0              1              1
 p_212           1              1              0              1              0              1              0              0
 p_213           1              1              0              1              0              1              0              1
 p_214           1              1              0              1              0              1              1              0
 p_215           1              1              0              1              0              1              1              1
 p_216           1              1              0              1              1              0              0              0
 p_217           1              1              0              1              1              0              0              1
 p_218           1              1              0              1              1              0              1              0
 p_219           1              1              0              1              1              0              1              1
 p_220           1              1              0              1              1              1              0              0
 p_221           1              1              0              1              1              1              0              1
 p_222           1              1              0              1              1              1              1              0
 p_223           1              1              0              1              1              1              1              1
 p_224           1              1              1              0              0              0              0              0
 p_225           1              1              1              0              0              0              0              1
 p_226           1              1              1              0              0              0              1              0
 p_227           1              1              1              0              0              0              1              1
 p_228           1              1              1              0              0              1              0              0
 p_229           1              1              1              0              0              1              0              1
 p_230           1              1              1              0              0              1              1              0
 p_231           1              1              1              0              0              1              1              1
 p_232           1              1              1              0              1              0              0              0
 p_233           1              1              1              0              1              0              0              1
 p_234           1              1              1              0              1              0              1              0
 p_235           1              1              1              0              1              0              1              1
 p_236           1              1              1              0              1              1              0              0
 p_237           1              1              1              0              1              1              0              1
 p_238           1              1              1              0              1              1              1              0
 p_239           1              1              1              0              1              1              1              1
 p_240           1              1              1              1              0              0              0              0
 p_241           1              1              1              1              0              0              0              1
 p_242           1              1              1              1              0              0              1              0
 p_243           1              1              1              1              0              0              1              1
 p_244           1              1              1              1              0              1              0              0
 p_245           1              1              1              1              0              1              0              1
 p_246           1              1              1              1              0              1              1              0
 p_247           1              1              1              1              0              1              1              1
 p_248           1              1              1              1              1              0              0              0
 p_249           1              1              1              1              1              0              0              1
 p_250           1              1              1              1              1              0              1              0
 p_251           1              1              1              1              1              0              1              1
 p_252           1              1              1              1              1              1              0              0
 p_253           1              1              1              1              1              1              0              1
 p_254           1              1              1              1              1              1              1              0
 p_255           1              1              1              1              1              1              1              1
```