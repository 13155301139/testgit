<template>
  <div class="realNameAuthentication">
  <div class="title-user-profile green">实名认证</div>
    <div class="real-from">
      <div class="real-from-group">
        <span>国家/地区</span>
        <div>
          <div class="country-select">
            <select id="areaCode" class="select-header id-select" style="height:40px;width:100%;background-color: #fff;
            border: 1px solid #d1d1d1;">
              <option value="86" selected="selected">中国大陆(China)</option>
              <option value="666">中国香港(HongKong)</option>
              <option value="940">阿布哈兹(Abkhazia)</option>
              <option value="93">阿富汗(Afghanistan)</option>
              <option value="355">阿尔巴尼亚(Albania)</option>
              <option value="213">阿尔及利亚(Algeria)</option>
              <option value="1">美国(America)</option>
              <option value="376">安道尔(Andorra)</option>
              <option value="244">安哥拉(Angola)</option>
              <option value="1264">安圭拉岛(Anguilla)</option>
              <option value="1268">安提瓜(Antigua)</option>
              <option value="54">阿根廷(Argentina)</option>
              <option value="374">亚美尼亚(Armenia)</option>
              <option value="297">阿鲁巴(Aruba)</option>
              <option value="61">澳大利亚(Australia)</option>
              <option value="43">奥地利(Austria)</option>
              <option value="994">阿塞拜疆(Azerbaijan)</option>
              <option value="973">巴林(Bahrain)</option>
              <option value="880">孟加拉国(Bangladesh)</option>
              <option value="1246">巴巴多斯(Barbados)</option>
              <option value="375">白俄罗斯(Belarus)</option>
              <option value="32">比利时(Belgium)</option>
              <option value="501">伯利兹(Belize)</option>
              <option value="229">贝宁(Benin)</option>
              <option value="1441">百慕大(Bermuda)</option>
              <option value="975">不丹(Bhutan)</option>
              <option value="591">玻利维亚(Bolivia)</option>
              <option value="267">博茨瓦纳(Botswana)</option>
              <option value="55">巴西(Brazil)</option>
              <option value="673">文莱(Brunei Darussalam)</option>
              <option value="359">保加利亚(Bulgaria)</option>
              <option value="226">布基纳法索(Burkina Faso)</option>
              <option value="95">缅甸(Burma)</option>
              <option value="257">布隆迪(Burundi)</option>
              <option value="855">柬埔寨(Cambodia)</option>
              <option value="237">喀麦隆(Cameroon)</option>
              <option value="1">加拿大(Canada)</option>
              <option value="238">佛得角(Cape Verde)</option>
              <option value="1345">开曼群岛(Cayman Islands)</option>
              <option value="235">乍得(Chad)</option>
              <option value="56">智利(Chile)</option>
              <option value="57">哥伦比亚(Colombia)</option>
              <option value="269">科摩罗和马约特(Comoros)</option>
              <option value="682">库克群岛(Cook Islands)</option>
              <option value="506">哥斯达黎加(Costa Rica)</option>
              <option value="385">克罗地亚(Croatia)</option>
              <option value="53">古巴(Cuba)</option>
              <option value="357">塞浦路斯(Cyprus)</option>
              <option value="420">捷克共和国(Czech Republic)</option>
              <option value="45">丹麦(Denmark)</option>
              <option value="253">吉布提(Djibouti)</option>
              <option value="1767">多米尼克(Dominica)</option>
              <option value="593">厄瓜多尔(Ecuador)</option>
              <option value="20">埃及(Egypt)</option>
              <option value="503">萨尔瓦多(El Salvador)</option>
              <option value="291">厄立特里亚(Eritrea)</option>
              <option value="372">爱沙尼亚(Estonia)</option>
              <option value="251">埃塞俄比亚(Ethiopia)</option>
              <option value="298">法罗群岛(Faroe Islands)</option>
              <option value="679">斐济(Fiji)</option>
              <option value="358">芬兰(Finland)</option>
              <option value="33">法国(France)</option>
              <option value="241">加蓬(Gabon)</option>
              <option value="995">格鲁吉亚(Georgia)</option>
              <option value="49">德国(Germany)</option>
              <option value="233">加纳(Ghana)</option>
              <option value="350">直布罗陀(Gibraltar)</option>
              <option value="30">希腊(Greece)</option>
              <option value="299">格陵兰(Greenland)</option>
              <option value="1473">格林纳达(Grenada)</option>
              <option value="502">危地马拉(Guatemala)</option>
              <option value="224">几内亚(Guinea)</option>
              <option value="245">几内亚比绍(Guinea-Bissau)</option>
              <option value="592">圭亚那(Guyana)</option>
              <option value="509">海地(Haiti)</option>
              <option value="504">洪都拉斯(Honduras)</option>
              <option value="852">香港(Hong Kong)</option>
              <option value="36">匈牙利(Hungary)</option>
              <option value="354">冰岛(Iceland)</option>
              <option value="91">印度(India)</option>
              <option value="62">印度尼西亚(Indonesia)</option>
              <option value="98">伊朗(Iran)</option>
              <option value="964">伊拉克(Iraq)</option>
              <option value="353">爱尔兰(Ireland)</option>
              <option value="972">以色列(Israel)</option>
              <option value="39">意大利(Italy)</option>
              <option value="1876">牙买加(Jamaica)</option>
              <option value="81">日本(Japan)</option>
              <option value="962">约旦(Jordan)</option>
              <option value="254">肯尼亚(Kenya)</option>
              <option value="850">北韓(Korea, North)</option>
              <option value="82">南韓(Korea, South)</option>
              <option value="965">科威特(Kuwait)</option>
              <option value="996">吉尔吉斯斯坦(Kyrgyzstan)</option>
              <option value="856">老挝(Laos)</option>
              <option value="371">拉脱维亚(Latvia)</option>
              <option value="961">黎巴嫩(Lebanon)</option>
              <option value="266">莱索托(Lesotho)</option>
              <option value="231">利比里亚(Liberia)</option>
              <option value="218">利比亚(Libya)</option>
              <option value="423">列支敦士登(Liechtenstein)</option>
              <option value="370">立陶宛(Lithuania)</option>
              <option value="352">卢森堡(Luxembourg)</option>
              <option value="853">澳门(Macao)</option>
              <option value="261">马达加斯加(Madagascar)</option>
              <option value="265">马拉维(Malawi)</option>
              <option value="60">马来西亚(Malaysia)</option>
              <option value="960">马尔代夫(Maldives)</option>
              <option value="223">马里(Mali)</option>
              <option value="356">马耳他(Malta)</option>
              <option value="596">马提尼克岛(Martinique)</option>
              <option value="222">毛里塔尼亚(Mauritania)</option>
              <option value="230">毛里求斯(Mauritius)</option>
              <option value="52">墨西哥(Mexico)</option>
              <option value="373">摩尔多瓦(Moldova)</option>
              <option value="377">摩纳哥(Monaco)</option>
              <option value="976">蒙古(Mongolia)</option>
              <option value="1664">蒙特塞拉特(Montserrat)</option>
              <option value="212">摩洛哥(Morocco)</option>
              <option value="258">莫桑比克(Mozambique)</option>
              <option value="264">纳米比亚(Namibia)</option>
              <option value="674">瑙鲁(Nauru)</option>
              <option value="977">尼泊尔(Nepal)</option>
              <option value="31">荷兰(Netherlands)</option>
              <option value="687">新喀里多尼亚(New Caledonia)</option>
              <option value="64">新西兰(New Zealand)</option>
              <option value="505">尼加拉瓜(Nicaragua)</option>
              <option value="227">尼日尔(Niger)</option>
              <option value="234">尼日利亚(Nigeria)</option>
              <option value="47">挪威(Norway)</option>
              <option value="968">阿曼(Oman)</option>
              <option value="92">巴基斯坦(Pakistan)</option>
              <option value="680">帕劳(Palau)</option>
              <option value="507">巴拿马(Panama)</option>
              <option value="595">巴拉圭(Paraguay)</option>
              <option value="51">秘鲁(Peru)</option>
              <option value="63">菲律宾(Philippines)</option>
              <option value="48">波兰(Poland)</option>
              <option value="351">葡萄牙(Portugal)</option>
              <option value="974">卡塔尔(Qatar)</option>
              <option value="262">留尼汪(Reunion)</option>
              <option value="40">罗马尼亚(Romania)</option>
              <option value="7">俄罗斯(Russia)、哈萨克斯坦</option>
              <option value="250">卢旺达(Rwanda)</option>
              <option value="1758">圣卢西亚(Saint Lucia)</option>
              <option value="685">萨摩亚(Samoa)</option>
              <option value="378">圣马力诺(San Marino)</option>
              <option value="966">沙特阿拉伯(Saudi Arabia)</option>
              <option value="221">塞内加尔(Senegal)</option>
              <option value="248">塞舌尔(Seychelles)</option>
              <option value="232">塞拉利昂(Sierra Leone)</option>
              <option value="65">新加坡(Singapore)</option>
              <option value="421">斯洛伐克(Slovakia)</option>
              <option value="386">斯洛文尼亚(Slovenia)</option>
              <option value="677">所罗门群岛(Solomon Islands)</option>
              <option value="252">索马里(Somalia)</option>
              <option value="27">南非(South Africa)</option>
              <option value="34">西班牙(Spain)</option>
              <option value="94">斯里兰卡(Sri Lanka)</option>
              <option value="249">苏丹(Sudan)</option>
              <option value="597">苏里南(Suriname)</option>
              <option value="268">斯威士兰(Swaziland)</option>
              <option value="46">瑞典(Sweden)</option>
              <option value="41">瑞士(Switzerland)</option>
              <option value="963">叙利亚(Syria)</option>
              <option value="886">台灣(Taiwan)</option>
              <option value="992">塔吉克斯坦(Tajikistan)</option>
              <option value="255">坦桑尼亚(Tanzania)</option>
              <option value="66">泰国(Thailand)</option>
              <option value="1242">巴哈马(The Bahamas)</option>
              <option value="220">冈比亚(The Gambia)</option>
              <option value="228">多哥(Togo)</option>
              <option value="676">汤加(Tonga)</option>
              <option value="216">突尼斯(Tunisia)</option>
              <option value="90">土耳其(Turkey)</option>
              <option value="993">土库曼斯坦(Turkmenistan)</option>
              <option value="256">乌干达(Uganda)</option>
              <option value="380">乌克兰(Ukraine)</option>
              <option value="44">英国(United Kingdom)</option>
              <option value="598">乌拉圭(Uruguay)</option>
              <option value="998">乌兹别克斯坦(Uzbekistan)</option>
              <option value="678">瓦努阿图(Vanuatu)</option>
              <option value="58">委内瑞拉(Venezuela)</option>
              <option value="84">越南(Vietnam)</option>
              <option value="967">也门(Yemen)</option>
              <option value="260">赞比亚(Zambia)</option>
              <option value="263">津巴布韦(Zimbabwe)</option>
            </select>
          </div>
          <!-- <input type="text" value="中国" disabled v-model="country"/>
          <span class="city-tips"></span> -->
        </div>
      </div>
      <div class="real-from-group">
        <span>姓名</span>
        <div>
          <input type="text" placeholder="姓名" v-model="RUserName" class="RUserName-input"/>
          <span class="name-tips"></span>
        </div>
      </div>
      <div class="real-from-group">
        <span>身份证号码</span>
        <div>
          <input type="text" placeholder="身份证号码" class="IDCard-input" v-model="RIDCard"/>
          <span class="IDCard-tips"></span>
        </div>
      </div>
      <!-- <div class="real-from-group">
        <span>借记卡号</span>
        <div>
          <input type="text" placeholder="借记卡号" v-model="RBankNum" class="RBankNum-input"/>
          <span class="BankCard-tips"></span>
        </div>
      </div> -->
      <!-- <div class="real-from-group">
        <span>开户银行</span>
        <div>
          <select class="bankStyle">
            <option>请选择银行</option>
            <option v-for="item in CBank" :value="item.abbreviation">{{item.bankName}}</option>
          </select>
          <span class="BankVal-tips"></span>
        </div>
      </div> -->
      <!--  <div class="real-from-group">
         <span>开户支行</span>
         <div>
           <input type="text" placeholder="开户支行名称" v-model="RBankName" class="RBankName-input"/>
           <span class="BankName-tips"></span>
         </div>
         <span class="tips-red">支行信息错误会导致提现失败，请仔细确认</span>
       </div> -->
      <!-- <div class="real-from-group">
        <span>开户地址</span>
        <div>
          <input type="text" placeholder="开户地址" v-model="RBankAdr" class="RBankAdr-input"/>
          <span class="BankName-tips"></span>
        </div>
        <span class="tips-red">开户支行地址信息错误会导致提现失败，请仔细确认</span>
      </div> -->
      <div class="real-from-group">
        <span>手机号码</span>
        <div>
          <input type="text" placeholder="手机" v-model="RUserPhone" class="RUserPhone-input"/>
          <span class="phone-tips"></span>
        </div>
      </div>
      <div class="real-from-group">
        <span>验证码</span>
        <div>
          <div class="input-box">
            <input type="text" placeholder="验证码" v-model="RYZ" class="RYZ-input" maxlength="6"/>
            <span @click="RgetCord()">{{rGetCord}}</span>
          </div>
          <span class="yz-tips"></span>
        </div>
      </div>
      <div class="real-from-group">
        <span>手机验证码</span>
        <div>
          <div class="input-box">
            <input type="text" placeholder="手机验证码" v-model="RCaptcha"/>
            <button @click="REgetCord()" class="REgetCorde">获取验证码</button>
          </div>
          <span class="phoneyz-tips"></span>
        </div>
      </div>
      <div class="real-from-group">
        <span>&nbsp;</span>
        <div>
          <div>
            <input type="checkbox" id="checkbox-input"/>
            <label
              for="checkbox-input">我郑重承诺：以上个人信息合法、真实、准确；如有变动，我将及时更新用户资料。如果因提供的注册资料不合法、不真实、不准确、不详尽的，我承担因此引起的相应责任及后果。</label>
          </div>
          <span class="phone-tips"></span>
        </div>
      </div>
      <div class="real-from-group">
        <span>&nbsp;</span>
        <div>
          <a href="javascript:;" class="lijiyanzheng" @click="pushReal()">立即认证</a>
          <span class="phone-tips"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default {
    data() {
      return {
        country: '中国',
        RUserName: '',
        RIDCard: '',
        RBankNum: '',
        RBankVal: '',
        RBankAdr: '',
        RBankName: '',
        RUserPhone: '',
        RCaptcha: '',
        certificateEnum: '',
        RYZ: '',
        rGetCord: '',
        CBank: []
      }
    },
    created() {
      let that = this;
      {
        this.$http({
          url: this.$URL_API + 'bank/all',
          method: 'GET',
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            'X-Authorization': 'Bearer ' + that.$store.state.token,
          }
        }).then((res) => {
          if (res.data.code !== 200) {
            this.showError(res.data.code, res.data.message);
          }
          if (res.data.code === 200) {
            that.CBank = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].abbreviation === 'alipay') {
                that.$store.state.bankId.alipay = res.data.data[i].id;
              }
              if (res.data.data[i].abbreviation === 'BOC') {
                that.$store.state.bankId.BOC = res.data.data[i].id;
              }
              if (res.data.data[i].abbreviation === 'ICBC') {
                that.$store.state.bankId.ICBC = res.data.data[i].id;
              }
              if (res.data.data[i].abbreviation === 'CCB') {
                that.$store.state.bankId.CCB = res.data.data[i].id;
              }
              if (res.data.data[i].abbreviation === 'ABC') {
                that.$store.state.bankId.ABC = res.data.data[i].id;
              }
            }
          }
        }).catch((req) => {
          this.showError(req.code, req.message)
        })
      }//获取支持银行
    },
    mounted() {
      let that = this;
      that.RgetCord();//获取验证码
      that.bankStyles($('.bankStyle').val());
      $('.bankStyle').change(function () {
        that.bankStyles($(this).val());
      });
      //获取bankid
      {
        $('.RBankName-input').keyup(function () {
          if (that.RBankNum) {
            that.$store.state.realNeed.bankNum = true;
          } else {
            that.$store.state.realNeed.bankNum = false;
          }
        })
      }
      {
        $('.RBankAdr-input').keyup(function () {
          if (that.RBankNum) {
            that.$store.state.realNeed.bankAdr = true;
          } else {
            that.$store.state.realNeed.bankAdr = false;
          }
        })
      }
      {
        $('.RUserName-input').keyup(function () {
          if (that.RUserName) {
            that.$store.state.realNeed.name = true;
          } else {
            that.$store.state.realNeed.name = false;
          }
        })
      }//姓名
      {
        $('.IDCard-input').keyup(function () {
          let pattern = /\d{17}[\d|x]|\d{19}/;
          if (pattern.test(that.RIDCard)) {
            $('.IDCard-tips').html('');
            that.$store.state.realNeed.IdCard = true;
          } else {
            that.$store.state.realNeed.IdCard = false;
            $('.IDCard-tips').html('请校验您的身份证号码').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
          }
        })
      }//身份证号验证
      {
        $('.RBankNum-input').keyup(function () {
          let reg = /^(\d{16}|\d{19})$/;
          if (reg.test(that.RBankNum)) {
            $('.BankCard-tips').html('');
            that.$store.state.realNeed.bankId = true;
          } else {
            that.$store.state.realNeed.bankId = false;
            $('.BankCard-tips').html('请校验您的银行卡号').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
          }
        })
      }//借记卡号
      {
        $('.RUserPhone-input').keyup(function () {
          let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
          if (!pattern.test(that.RUserPhone)) {
            $('.phone-tips').html('请校验您的手机号码').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
            that.$store.state.realNeed.phone = false;
          } else {
            $('.phone-tips').html('');
            that.$store.state.realNeed.phone = true;
          }
        });
      }//手机号码验证
      {
        $('.RYZ-input').keyup(function () {
          //console.log(that.rGetCord);
          //console.log(that.RYZ);
          if (that.RYZ == that.rGetCord) {
            $('.yz-tips').html('');
            that.$store.state.realNeed.Yz = true;
          } else {
            $('.yz-tips').html('请核对验证码').css({
              alignSelf: 'flex-start',
              color: 'red'
            });
            that.$store.state.realNeed.Yz = false;
          }
        })
      }//验证码校验
      //选中协议
      {
        $('#checkbox-input').click(function () {
          that.$store.state.realNeed.checkbox = $(this).is(':checked');
        });
      }
    },
    methods: {
      RgetCord() {
        let num = parseInt(Math.random() * 10000);//0~9999
        if (num < 10) {
          num = '000' + num;
        } else if (num < 100) {
          num = '00' + num;
        } else if (num < 1000) {
          num = '0' + num;
        }
        this.rGetCord = num;
      },
      pushReal() {
        let that = this;
          that.$http({
            url: this.$URL_API + 'authentication/realNameAuth',
            method: 'POST',
            data: {
              country: that.country,
              userName: that.RUserName,
              idCard: that.RIDCard,
              bankId: that.RBankVal,
              bankBranch: that.RBankName,
              bankAddr: that.RBankAdr,
              accountNo: that.RBankNum,
              mobile: that.RUserPhone,
              certificateEnum: 'IDCARD',
              captcha: that.RCaptcha
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              'X-Authorization': 'Bearer ' + that.$store.state.token,
              "Content-Type": "application/json;charset=UTF-8",
            }
          }).then((res) => {
            this.showError(res.data.code, res.data.message);
            if (res.data.code === 200) {
              that.$router.push('/settings');
            }
          }).catch((req) => {
            this.showError(req.code, req.message)
          })


      },
      bankStyles(num) {
        let that = this;
        switch (num) {
          case 'alipay':
            that.RBankVal = that.$store.state.bankId.alipay;
            break;
          case 'BOC':
            that.RBankVal = that.$store.state.bankId.BOC;
            break;
          case 'ICBC':
            that.RBankVal = that.$store.state.bankId.ICBC;
            break;
          case 'CCB':
            that.RBankVal = that.$store.state.bankId.CCB;
            break;
          case 'ABC':
            that.RBankVal = that.$store.state.bankId.ABC;
            break;
        }
      },
      REgetCord() {
        let that = this;
        let second = 60;
        let pattern = /0?^(13|14|15|18|17)[0-9]{9}/;
        let url = that.$URL_API + 'captcha/mobile/' + that.RUserPhone;
        if (that.RUserPhone.length !== 0 && pattern.test(that.RUserPhone)) {
          that.$http.get(url).then((data) => {
            this.showError(data.data.code, data.data.message);
            if (data.data.code === 200) {
              $('.REgetCorde').attr("disabled", true).css("cursor", "default");
              that.timer = setInterval(function () {
                $('.REgetCorde').html((--second) + 's');
                if (second <= 0) {
                  $('.REgetCorde').removeAttr("disabled").css("cursor", "pointer");
                  clearInterval(that.timer);
                  $('.REgetCorde').html('获取验证码');
                }
              }, 1000);
              $('.phoneyz-tips').html('请输入验证码').css({
                alignSelf: 'flex-start',
                color: 'red',
                marginLeft: '1.5rem'
              })
            }
          }).catch((req) => {
            this.showError(req.code, req.message)
          })
        } else {
          $('.phoneyz-tips').html('请核对手机号').css({
            alignSelf: 'flex-start',
            color: 'red',
            marginLeft: '1.5rem'
          })
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .title-user-profile {
    height: 50px;
    
    line-height: 50px;

    font-size: 18px;
    
    font-weight:bolder;
    padding-left: 20px;

    color: #ffffff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

    &.green {
      background: #2A8863;
    }
  }
  .realNameAuthentication .header-title {
    border-bottom: 1px solid #ddd;
  }

  .realNameAuthentication .header-title p {
    color: #666;
    padding: 1.3rem 0;
    font-size: 1.333rem;
  }

  .real-from {
    padding: 3rem 0;
    font-size: 1.167rem;
  }

  .real-from-group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1.2rem;
    height: 5rem;
  }

  .real-from-group > span:nth-of-type(1) {
    padding-top: 20px;
    width: 20rem;
    margin-bottom: 0;
    text-align: right;
    margin-right: 2rem;
  }

  .tips-red {
    margin-left: 2rem;
    color: red;
  }

  .real-from-group > div {
    width: 28.8rem;
    margin-bottom: -1.6rem;
  }

  .input-box {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
  }

  .input-box > input {
    border: none !important;
    width: 70% !important;
  }

  .input-box > span, .input-box > button {
    background: #16AB3B;
    color: #fff;
    text-align: center;
    width: 30%;
    height: 36px !important;
    line-height: 35px !important;
    cursor: pointer;
    border: none;
  }

  .real-from-group:nth-of-type(1) > div > input {
    cursor: not-allowed;
  }

  .real-from-group > div > input, .real-from-group > div > select, .input-box > input {
    width: 100%;
    padding: 0.667rem 1rem;
    box-sizing: border-box;
    border: none;
    border: 1px solid #ddd;
  }

  .real-from-group > div > span, .input-box > span, .input-box > button {
    height: 1.5rem;
  }

  .lijiyanzheng {
    width: 10.833rem;
    text-align: center;
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
    background: #16AB3B;
    color: #fff;
    border-radius: .133rem;
  }
</style>
