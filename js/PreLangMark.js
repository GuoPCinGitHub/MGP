/*
PreLangMark.js
对指定代码语言的<pre>在右上角添加语言

Special thanks to [[User:Leranjun]]

通知：此JS如无必要将不再修改。
      已知问题：不支持[[User:机智的小鱼君/gadget/Highlight.js]]所提供的代码高亮，可考虑改用[[User:Bhsd/js/PreLangMark.js]]。
      更多用户小工具参见[[User:星海子/Gadgets]]。
*/

$(function () {
    $("pre").each(function () {
        var self = $(this);
        if (self.attr("class")) {
            var pre_lang = self.attr("class").match(/(?:lang|mw)\-[\"|\']?([^c].*?|c|cpp|css)\b/)[1];
            self.css({
                "padding-top": "20px",
                position: "relative",
                overflow: "hidden"
            });
            $("<span>")
                .css({
                    content: pre_lang,
                    position: "absolute",
                    top: 0,
                    right: 0,
                    padding: "5px 10px",
                    color: "#222",
                    "font-family": '"Product Sans", "Source Sans Pro", Tahoma, sans-serif',
                    "font-size": "0.8em",
                    "font-weight": 700,
                    "user-select": "none",
                    "text-transform": "uppercase"
                })
                .text(pre_lang)
                .appendTo(self);
        }
    });
});