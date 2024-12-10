import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function TechnologyStack() {
  const markdown = `
<div align="center" style="margin-top: 45px;">
  
  # FrameWork
  [![My Skills](https://skillicons.dev/icons?i=react,nodejs,flutter,flask,spring,nestjs)](https://skillicons.dev)
  
  <div style="margin-top: 40px;"></div>

  # Language
  [![My Skills](https://skillicons.dev/icons?i=ts,js,dart,python,java)](https://skillicons.dev)
  
  <div style="margin-top: 40px;"></div>

  # Tool
  [![My Skills](https://skillicons.dev/icons?i=idea,vscode,github,figma,discord)](https://skillicons.dev)
  
</div>  
`;
  
    return (
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {markdown}
      </ReactMarkdown>
    );
}