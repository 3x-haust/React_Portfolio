import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function SelfIntroduction() {
  const markdown = `
<section align="center" style="display: flex; flex-direction: column; align-items: center;">
  <img src="images/profile.jpeg" alt="profile" style="width: 150px; height: 150px; border-radius: 999px" />
</section>

<div style="margin-top: 45px;">

<section align="center" style="display: flex; flex-direction: column; white-space: nowrap;">
  <p>안녕하세요! 저는 미림마이스터고 1학년에 재학 중인 풀스택 개발자 유성윤입니다.</p>
  <p>어릴 때부터 프로그래밍에 관심을 가지고 꾸준히 학습하며 성장해 왔습니다.</p>
  <p>새로운 기술을 탐구하고 문제를 해결하는 것을 즐기며, 창의적인 아이디어를 바탕으로 더 나은 세상을 만드는 개발자가 되고자 합니다.</p>
</section>

<section style="display: flex; flex-direction: column; align-items: center; gap: 5px; margin-top: 30px;">
  <img src="http://img.shields.io/badge/-Gamil-black?style=flat&logo=Gmail&link=mailto:s2424@e-mirim.hs.kr" style="height: auto;"/>
  
  <img src="http://img.shields.io/badge/-Github-black?style=flat&logo=Github&link=https://github.com/3x-haust" style="height: auto;"/>
  
  <img src="http://img.shields.io/badge/-Instagram-black?style=flat&logo=Instagram&link=https://instagram.com/3xhaust_/" style="height: auto;"/>
  
  <img src="http://img.shields.io/badge/-Velog-black?style=flat&logo=Velog&link=https://velog.io/@kaje033/posts" style="height: auto;"/>
  
  <img src="http://img.shields.io/badge/-X-black?style=flat&logo=X&link=https://x.com/3xhaust_" style="height: auto;"/>
  </section>  
`;
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
      {markdown}
    </ReactMarkdown>
  );
}