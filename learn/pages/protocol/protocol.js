// pages/protocol/protocol.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    node1: "<ul style='list-style: decimal;'><li>为了保障用户的权益，您在自愿注册使用本平台服务前，必须仔细阅读并充分理解知悉本协议所有条款。一经注册或使用本平台服务即视为您对本协议的充分理解和接受，并承诺遵守中国的各类法律规定，如有违反而导致任何法律后果的发生，您将以自己的名义独立承担相应的法律责任。</li><li>本平台只接受持有中国大陆（不包括香港特区、澳门特区及台湾地区）有效身份证件的18周岁以上且具有完全民事行为能力的自然人成为注册用户。如您不符合资格，请勿注册，否则本平台有权随时终止您的用户资格。</li><li>本协议内容包括本协议的所有条款及本平台已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的一部分，与协议正文具有同等法律效力。本协议是注册用户与本平台共同签订的，适用于用户在本平台的全部活动。</li><li>本平台有权根据业务发展需要修改本协议或根据本协议制定、修改各类具体规则并在本平台相关系统板块发布，不再另行向用户做个别通知，用户有权选择继续或者停止使用本平台的服务。若您在本协议及具体规则内容变更后继续使用本服务的，表示您已充分阅读、理解并接受修改后的协议和具体规则内容，也将遵循修改后的协议和具体规则使用本平台的服务，同时就您在协议和具体规则修订前通过本平台进行的交易及其效力，视为您已同意并已按照本协议及有关规则进行了相应的授权和追认。若您不同意修改后的协议内容，您应停止使用本平台的服务，本平台也有权不经告知即中止、 终止本协议或者限制您进入本平台的全部或者部分板块且不承担任何法律责任，但该中止、终止或限制行为并不能豁免您在本平台已经进行的交易下所应承担的义务。</li><li>您确认签署本协议后，本协议即在您和本平台之间产生法律效力。您只要在“学贝”平台按照本平台规定的注册程序成功注册为用户，您的行为即表示同意并签署了本协议。为向您提供更加便利的服务，您在此同意并授权，学贝平台可以将您向本平台提供的信息（包括但不限于您的平台用户账户信息、您的身份信息）提交至学贝的合作方平台用于注册和登录。当您登录学贝合作方平台时，本平台可使用您通过学贝平台传递的信息为您在合作方平台进行自动登录，同时您同意接受合作方平台注册协议的约束。</li></ul>",
    node2: "<ul style='list-style: decimal;'><li>平台提供的服务内容主要包括：培训机构筛选、报名试听课、课程交易、交易管理服务、合同管理服务、分期需求管理等，具体详情以平台当时提供的服务内容或页面允许的操作为准。服务的部分内容需要用户根据平台要求完成身份认证、人脸识别认证、银行卡认证等认证，用户未进行身份认证及/或人脸识别认证、银行卡认证、其他认证将无法使用该部分服务。用户因未能完成认证而无法享受部分服务造成的损失，平台不承担任何责任。</li><li>平台为用户提供交易信息发布服务，前述交易信息一经发布，非经平台同意，不得变更、撤回或撤销。用户承诺，其通过平台上传或发布的任何资料信息均真实有效。如因违背上述承诺，造成的任何法律后果，用户都将自行承担责任。此外，用户有义务及时更新个人信息资料。如因未及时更新个人信息资料，导致平台无法正常提供服务时，平台不承担任何责任，所有后果应由用户个人承担。</li><li>平台为用户提供以下客户服务（以页面展示的服务内容及允许的操作为准）：<ul style='list-style:lower-alpha'><li>银行卡认证：为使用平台或平台指定的银行／第三方支付公司提供的代还、代扣、划转等服务，用户应按照平台规定的流程提交以用户本人名义登记的有效银行借记卡等信息，经由平台审核通过后，用户平台账户与前述银行账户进行绑定。</li><li>代付：用户可以委托平台将用户银行卡里的款项支付给用户指定的其他方。平台不保证其提供的前述服务符合用户的期望。</li><li>代收：用户可以委托平台将用户获得的分期款代收至用户的银行卡内。平台不保证其提供的前述服务符合用户的期望。</li><li>查询：平台将对用户在平台上的所有操作进行记录，不论该操作之目的最终是否实现。用户可以通过用户平台账户实时查询其名下的交易记录。用户理解并认可用户在平台进行的资金划转委托及相关交易记录，以银行系统、第三方支付机构、证券公司等合作伙伴系统记录为准，用户通过平台查询的任何信息仅作为参考，不作为相关操作或交易的证据或依据。</li></ul></li><li>平台将为用户提供以下合同管理服务（以页面展示的服务内容及允许的操作为准）：<ul style='list-style:lower-alpha'><li>通过平台交易订立的合同均采用电子合同方式。用户登录平台后，根据平台的相关规则，在平台通过相关合同约定的订立方式、点击确认或类似方式签署的电子合同，即视为用户本人的真实意愿并以用户本人名义签署的合同，具有法律效力。</li><li>用户根据本协议以及平台发布的相关规则签署电子合同后，不得擅自修改该合同。如对电子合同的内容有任何疑问等情形，用户可通过平台进行查看核对。</li><li>用户不得私自仿制、伪造在平台上签订的电子合同或印章，不得利用伪造的合同进行任何非法使用，否则由用户自行承担民刑事责任。</li></ul></li><li>平台基于以下前提或条件为用户提供服务，用户明确知悉并同意：<ul style='list-style:lower-alpha'><li>平台仅为符合本协议及平台发布的各项规则等文件所规定之条件的用户提供服务。</li><li>平台无法也没有义务保证用户在发出分期要约后，能够实际获得分期款，用户因前述交易导致的损失（包括但不限于利息、手续费等损失）由用户自行承担，平台不承担责任。</li><li>用户应遵守平台制定的交易规则，通过通讯设备向平台发送相关交易或操作（包括但不限于支付或收取款项、冻结资金、订立合同等）的不可撤销的指令。用户同意相关指令的执行时间以平台在平台系统中进行实际操作的时间为准。用户同意平台有权依据本协议及/或平台相关纠纷处理规则等约定对相关事项进行处理。</li><li>平台有权修复因系统故障或其他任何原因导致的处理错误。如果该错误导致用户实际收到的款项多于应获得的金额，则平台有权直接从相关用户平台账户中扣回相应款项。若此款项已汇入用户的银行账户，平台保留向用户追索的权利，由此产生的追索费用由用户承担。用户理解并同意，用户因前述处理错误而多付或少付的款项均不计利息，平台不承担因前述处理错误而导致的任何损失或责任（包括用户可能因前述错误导致的利息、汇率等损失）。</li></ul></li><li>用户同意，平台有权在提供服务过程中以各种方式在平台页面上投放商业性广告或其他任何类型的商业信息，并且，用户同意接受平台通过短信、电子邮件或其他方式向用户发送商品促销或其他相关商业信息。</li></ul>",
    node3: "<ul style='list-style: decimal;'><li>用户必须是符合中华人民共和国法律规定的具有完全民事权利和民事行为能力，能够独立承担民事责任的自然人，方有资格签订本协议并可能获得平台账户。用户依照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，方可正式获得平台账户并使用平台相应服务。除非法律明文规定、司法裁定，用户账户不得以任何方式转让，否则由此产生的一切责任均由用户本人承担。</li><li>用户应保证其提供的用户信息的真实、准确、完整、有效，如有变更，应及时通过客服电话通知平台并按照平台的要求办理变更手续。如用户未按照平台的规定提交相关真实、有效的信息，平台有合理的理由怀疑用户提交的信息为错误、虚假或不完整的，平台有权拒绝为用户提供服务，对此平台不承担任何责任。同时，因此所产生的任何直接或间接的支出、损失、费用、处罚将由用户承担。若由于用户未及时更新用户信息，而导致平台相关服务无法提供或服务的有关流程及操作发生任何错误，用户不得以此为由取消交易、拒绝支付交易款项和服务手续费或采取其它不当行为，并将独立承担因此产生的所有责任和后果。</li><li>用户不得通过平台发布违反法律、法规、政策或破坏性的信息，不得以任何非法目的或途径使用平台服务，不得干扰平台系统的正常运作。</li><li>用户应对与用户平台账户绑定的银行卡账户拥有合法的使用权，如用户因故对银行卡账号丧失使用权的，则平台可停止为用户提供服务，同时，用户可以其另外提供的有效银行卡账户向平台申请更换用户平台账户。</li><li>用户同意，确保账户安全是用户的责任。通过个人账户所进行的一切操作，发布的一切言论，都视为用户本人的行为及其真实意图的表达，所有损失及法律后果由用户本人自行承担。</li></ul>",
    node4: "<ul style='list-style: decimal;'><li>平台有权根据用户所提供注册资料的真实性、准确性、完整性、有效性以及是否符合平台规定的其他条件，决定用户的注册成功与否。</li><li>平台有权基于单方独立判断，在其认为可能发生危害交易安全等情形时，不经通知而先行暂停、中断或终止向用户提供本协议项下的全部或部分用户服务（包括收费服务），且无需对用户或任何第三方承担任何责任。前述情形包括但不限于：<ul style='list-style:lower-alpha'><li>平台认为用户提供的用户资料不具有真实性、准确性、有效性或完整性；</li><li>平台发现异常交易，有违法违规或有疑义；</li><li>平台认为用户账户涉嫌洗钱、套现、传销、被冒用或平台认为有风险的情形；</li><li>平台认为用户已经违反本协议中规定的各类规则及原则；</li><li>用户在使用平台收费服务时未按规定向平台支付相应的服务费用；</li><li>用户平台账户已连续三年内未实际使用。</li></ul></li><li>平台有权基于交易安全等方面的考虑而设定涉及交易的相关事项，包括但不限于交易限额、交易次数等。</li><li>用户存在恶意诋毁或损害平台声誉、攻击平台相关系统、利用平台用户身份从事违反国家法律法规活动等行为之一的，平台有权单方面终止用户的权利，并保留追究用户法律责任的权利。</li><li>用户明确知悉并同意，平台不对用户的交易实现做任何形式的承诺。</li></ul>",
    node5: "<ul style='list-style: decimal;'><li>当用户使用平台提供的服务时，平台可能会向用户收取相关平台服务费用，平台将公布各项服务费用（如有）收取方式及金额说明。平台保留单方面制定及调整服务费用的权利。</li><li>用户在使用平台服务过程中可能需要向第三方机构（如银行或第三方支付公司等）支付一定的费用，具体收费标准详见第三方机构网站相关页面，或平台的提示。用户与第三方机构之间就费用支付事项产生的纠纷与平台无关。</li></ul>",
    node6: "<ul style='list-style: decimal;'><li>因用户自身的原因导致的任何损失或责任，由用户自行负责，平台不承担任何责任。平台不承担责任的情形包括但不限于：<ul><li>用户未按照本协议或平台公布的规则进行操作导致的任何损失或责任；</li><li>用户使用未经认证的银行卡或使用非用户本人的银行卡，用户的银行卡被冻结、挂失等导致的任何损失或责任；</li><li>用户平台账户及银行账户内余额不足导致的任何损失或责任。</li></ul></li><li>在任何情况下，对于用户使用涉及由第三方提供相关服务的责任由该第三方承担，平台不承担任何责任。该等情形包括但不限于：<ul style='list-style:lower-alpha'><li>因银行、第三方支付公司等第三方未按照用户和/或平台指令进行操作引起的任何损失或责任；</li><li>因银行、第三方支付公司等第三方原因导致资金未能及时到账而引起的任何损失或责任；</li><li>因银行、第三方支付公司等第三方对交易限额或次数限制而引起的任何损失或责任；</li><li>因其他第三方的行为或原因导致的任何损失或责任。</li></ul></li><li>平台上的服务可能涉及由第三方所有、控制或者运营的网站（以下简称“第三方网站”）。平台不能保证也没有义务保证第三方网站上任何信息的真实性和有效性。用户应按照第三方网站的服务协议使用第三方网站，而不是按照本协议。</li><li>用户经由平台上的服务而使用、下载或取得任何资料，应由用户自行考量且自负风险，因资料的下载而导致的任何损坏由用户自行承担。</li></ul>",
    node7: "<ul style='list-style: decimal;'><li>平台将以高度的勤勉、审慎义务对待用户的个人信息，尊重并保护所有使用平台服务用户的个人隐私，并使用各种制度、安全技术和程序等措施等来严格保护用户的个人信息安全，保护用户的个人信息不被未经授权的访问、篡改、披露或破坏。除本协议及具体授权条款约定外，在未征得用户事先许可的情况下，平台不会将用户个人信息对外披露或向第三方提供。</li><li>平台收集信息的范围仅限于平台认为了解用户的需求和开展业务所必需的相关资料，以给用户提供更准确、更有个性化的服务。平台将按照《信息授权服务协议》中具体授权条款的规定收集、存储、保护、使用和共享用户的个人信息，这些具体授权条款将在用户使用平台服务的过程中以弹窗提醒、协议展示等方式呈现，用户应在使用各项服务前完整地阅读具体授权条款，以帮助用户了解维护自己隐私权的方式。</li><li>用户在同意本协议或使用平台任意服务之时，即视为用户已同意平台按照具体授权条款来合法使用和保护用户的个人信息。</li></ul>",
    node8: "<ul style='list-style: decimal;'><li>除相关法律、法规明确规定外，平台仅对本协议中列明范围内的责任负责。</li><li>因以下情况，平台没有正确执行或无法履行用户在平台提交的操作指令，平台不承担任何责任：<ul style='list-style:lower-alpha'><li>指令信息不明、存在乱码或不完整等；</li><li>用户所拥有的产品发生失效、过期、终止、作废等情况；</li><li>不可抗力或意外事件；</li><li>其它平台无过失的情况。</li></ul></li><li>用户须妥善保存用户名、密码，对用户保管不善造成的损失，平台不对此承担任何责任。用户亦不得以其密码等信息丢失否认已订立的合同的效力。</li><li>如果用户因在第三方设备、移动通讯设备、公共共享环境或电脑被远程监控的情况下使用平台提供的服务而造成包括但不限于信息泄露、数据丢失以及财产损失的，平台不对此承担任何责任。</li><li>如果用户将用户名或平台账户详细信息输入除平台安全登陆系统外的其它任何服务系统，而造成包括但不限于利润、商誉、使用、数据等方面的损失，平台不承担任何责任。</li><li>如发生不可抗力事件、病毒、黑客攻击、第三方服务瑕疵、政府行为以及现有科学技术限制等原因导致的服务中断、数据丢失以及其它的损失和风险，不应视为平台违约，平台无需为此承担任何违约责任。</li><li>平台服务不允许用户使用他人身份信息注册，否则，因此产生的法律责任将由用户本人承担。用户在平台添加第三人账户，须事先获得第三人同意。一旦输入正确的用户名和密码，平台即视用户的行为已获得第三人同意。平台不对用户或第三人因此产生的损失承担任何责任，并且如该项操作造成平台损失的，平台将保留追索的权利。</li><li>任何情况下，平台对本协议所承担的违约赔偿责任总额不超过平台已向用户收取的服务费用总额。</li></ul>",
    node9: "<ul style='list-style: decimal;'><li>用户了解并认可，任何通过平台进行的交易并不能避免以下风险的产生，平台不能也没有义务为如下风险负责：<ul style='list-style:lower-alpha'><li>政策监管风险：因宏观政策、财政政策、货币政策、监管导向、行业政策、地区发展政策等因素引起的无法实现交易的风险；</li><li>违约风险：因其他交易方无力或无意愿按时足额履约，用户有可能遭受损失；</li><li>操作风险：任一方使用的计算机系统被第三方侵入、宕机，或火灾、恐怖攻击灾难发生等，用户有可能遭受损失。</li><li>因用户的过错导致的任何损失，该过错包括但不限于：决策失误、操作不当、遗忘或泄露密码、密码被他人破解、用户委托他人代理交易时他人恶意或不当操作而造成的损失。</li></ul></li><li>平台不对任何用户及/或任何交易提供任何担保或条件，无论是明示、默示或法定的。平台不能也不试图对用户发布的信息进行控制，对该等信息，平台不承担任何形式的证明、鉴定服务。平台不能完全保证平台内容的真实性、充分性、可靠性、准确性、完整性和有效性，并且无需承担任何由此引起的法律责任。用户依赖于用户的独立判断进行交易，用户应对其作出的判断承担全部责任。</li><li>以上并不能揭示用户通过平台所进行交易的全部风险及市场的全部情形。用户在做出交易决策前，应全面了解相关交易，谨慎决策，并自行承担全部风险。</li></ul>",
    node10: "<ul style='list-style: decimal;'><li>平台上提供的所有内容（包括但不限于文字、音频、视频、图片、图表、广告、平台向用户发送的电子邮件等）的知识产权归平台及相关权利人所有。</li><li>除另有声明外，平台提供平台服务时所依托的软件著作权和专利权归平台及相关权利人所有。</li><li>未经平台授权，用户不得以任何方式擅自修改、复制、存储、传送、抄袭、分发上述内容。</li><li>未经平台授权，用户不得将平台包含的任何内容用作商业或其它公开用途。任何未经平台授权对平台内容的使用均属于违法行为。</li></ul>",
    node11: "<ul style='list-style: decimal;'><li>本协议的订立、生效、履行、解释以及由此产生的所有事项均适用中华人民共和国法律。</li><li>本协议中的部分条款无效，不影响其它条款的效力。若上述无效条款构成本协议经济目的之条款或核心条款，则该条款应被尽可能接近各方意图、能够保留本协议要求的经济目的且为有效的新条款所取代。在此情况下，本协议的其它条款仍然有效。</li></ul>",
    node12: "<ul style='list-style: decimal;'><li>凡因履行本协议所引起的任何争议，双方同意首先以友好协商的方式解决。协商不成的，任一方均可将争议提交杭州学贝科技有限公司所在地人民法院管辖。</li></ul>",
  },
})