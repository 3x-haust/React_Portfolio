import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function Projects() {
  const markdown = `
<div style="margin-top: 45px; white-space: nowrap;">

- [] [**MrimToday**](https://github.com/3x-haust/Nods.js_SchoolMealAuto) - 기획 및 개발 <sub>(2024.05.21 ~ 2024.05.26)</sub>

<div style="margin-top: 10px;"></div>

- [앱잼 26회] [**QuestLink**](https://github.com/3x-haust/Node.js_AppJamQuestLink) 생활파트 최우수상 - 기획 참여 및 BE 개발 <sub>(2024.06.22 ~ 2024.06.23)</sub>

<div style="margin-top: 10px;"></div>

- [] [**EzyLang**](https://github.com/3x-haust/Java_EzyLang) - 기획 및 개발 <sub>(2024.07.20 ~ 2024.09.1)</sub>

<div style="margin-top: 10px;"></div>

- [2024 SK하이닉스 하인슈타인 올림피아드 대회] [**JoinUS**](https://github.com/3x-haust/JoinUS) 발표상 - BE 개발 <sub>(2024.08.05 ~ 2024.09.07)</sub>

<div style="margin-top: 10px;"></div>

- [] [**Blog**](https://github.com/3x-haust/3xhaust_blog) - 기획 및 FE, BE 개발 <sub>(2024.09.02 ~ )</sub>

<div style="margin-top: 10px;"></div>

- [] [**AvnoiFramework**](https://github.com/3x-haust/Java_AvnoiFramework) - <sub>기획 및 개발 (2024.09.8 ~ )</sub>

<div style="margin-top: 10px;"></div>

- [2024 미림 해커톤] [**Dash**](https://github.com/3x-haust/2024_MITHON_Dash) 최우수상 - 기획 및 FE, BE 개발 및 UI/UX 디자인 <sub>(2024.10.18 ~ 2024.10.19)</sub>

<div style="margin-top: 10px;"></div>

- [2024 SW 동행 데모데이] [**GreenOne**](https://github.com/3x-haust/GreenOne) 장려상 - FE 및 BE 개발 <sub>(2024.10.21 ~ 2024.10.25)</sub>

<div style="margin-top: 10px;"></div>

- [2024 태국 국제교류(국제화지원사업)] [**국립중앙박물관 소개**](https://github.com/3x-haust/React_thai) - FE 개발 및 디자인 <sub>(2024.10.26 ~ 2024.10.27)</sub>

<div style="margin-top: 10px;"></div>

- [메이커 페어 서울 2024] [**MagicMirror**](https://github.com/3x-haust/2024MakerFaire_MagicMirror) - 기획 및 FE, BE 개발 <sub>(2024.07.17 ~ 2024.10.13)</sub>

<div style="margin-top: 10px;"></div>

- [2024 SW 동행 해커톤] [**Whatpl**](https://github.com/3x-haust/Whatpl) 후원기업상 - 기획 및 FE, BE 개발 <sub>(2024.11.23 ~ 2024.11.24)</sub>

</div>
  `;

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
      {markdown}
    </ReactMarkdown>
  );
}