# 安装程序命令行参数

Quick Macros 的安装程序支持以下可选命令行参数，适用于系统管理员或其他调用安装程序的程序。

## 参数说明

- **/SP-**  
  禁用安装开始时的“This will install... Do you wish to continue?”提示。

- **/SILENT**, **/VERYSILENT**  
  使安装程序以静默或非常静默模式运行：
  - **/SILENT**：不显示向导和背景窗口，但显示安装进度窗口。
  - **/VERYSILENT**：不显示安装进度窗口。
  - 其他行为正常，例如安装过程中的错误消息仍会显示（除非使用 `/SP-` 禁用启动提示）。
  - 若需要重启且未使用 `/NORESTART`，`/SILENT` 会显示“Reboot now?”消息框，`/VERYSILENT` 会自动重启而不询问。

- **/LOG**  
  在用户 TEMP 目录中创建日志文件，记录安装过程中的文件操作详情，有助于调试。例如，检查文件是否被替换或跳过及其原因。

- **/NOCANCEL**  
  禁用安装过程中的取消按钮和关闭按钮的点击，防止用户取消安装。与 `/SILENT` 或 `/VERYSILENT` 一起使用效果更佳。

- **/NORESTART**  
  指示安装程序即使需要重启也不执行重启（通常仅在重新安装时需要）。

- **/RESTARTEXITCODE=exit code**  
  指定当需要重启时安装程序返回的自定义退出代码。与 `/NORESTART` 一起使用。

- **/LOADINF="filename"**  
  指示安装程序在检查命令行后从指定文件加载设置。文件可通过 `/SAVEINF` 创建。若文件名包含空格，需用引号括起来。

- **/SAVEINF="filename"**  
  指示安装程序将安装设置保存到指定文件。若文件名包含空格，需用引号括起来。

- **/DIR="x:\dirname"**  
  覆盖“Select Destination Location”向导页面的默认目录名，需指定完整路径。

- **/GROUP="folder name"**  
  覆盖“Select Start Menu Folder”向导页面的默认文件夹名称。

- **/NOICONS**  
  指示安装程序在“Select Start Menu Folder”向导页面上默认勾选“Don’t create any icons”选项。