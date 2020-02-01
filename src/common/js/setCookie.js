import Cookies from 'js-cookie'
export default function setMusicCookie() {
  const cookie = 'SameSite=lax; _ga=GA1.2.1640010541.1562649645; pgv_pvi=8126734336; pgv_pvid=2727011185; RK=GbQAhz5NY6; ptcz=71a6004155f89fe7c1fc724abe95e95b764121911316c56bb2bfc9604abc54b0; tvfe_boss_uuid=e6b229f8f02986a7; o_cookie=3315161861; pac_uid=1_3315161861; XWINDEXGREY=0; ied_qq=o3315161861; ts_uid=7439219008; yqq_stat=0; pgv_si=s2697661440; pgv_info=ssid=s6970180150; ts_refer=www.baidu.com/link; ts_last=y.qq.com/; userAction=1'
  const cookieInfos = cookie.split('; ')
  for (let i = 0; i < cookieInfos.length; i++) {
    const [key, val] = cookieInfos[i].split('=')
    if (val) {
      Cookies.set(key, val)
    }
  }
}
