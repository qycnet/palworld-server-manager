import os
import sys

def generate_config():
    """
    从环境变量或用户输入生成配置文件
    """
    # 检查环境变量中是否有PAT
    github_pat = os.environ.get('GITHUB_PAT')
    
    # 如果环境变量中没有PAT，则从命令行参数获取
    if not github_pat and len(sys.argv) > 1:
        github_pat = sys.argv[1]
    
    # 如果仍然没有PAT，则从用户输入获取
    if not github_pat:
        github_pat = input("请输入您的GitHub Personal Access Token: ")
    
    if not github_pat:
        print("错误：未提供GitHub PAT。配置文件生成失败。")
        sys.exit(1)
    
    # 读取模板文件
    try:
        with open('config.template.ini', 'r') as template_file:
            config_template = template_file.read()
    except FileNotFoundError:
        print("错误：找不到模板文件 'config.template.ini'")
        sys.exit(1)
    
    # 替换模板中的占位符
    config_content = config_template.replace('${GITHUB_PAT}', github_pat)
    
    # 写入实际的配置文件
    try:
        with open('config.ini', 'w') as config_file:
            config_file.write(config_content)
        print("配置文件已成功生成：config.ini")
    except Exception as e:
        print(f"错误：无法写入配置文件：{e}")
        sys.exit(1)
    
    print("\n注意：确保将 'config.ini' 添加到 .gitignore 文件中，避免意外提交敏感信息！")

if __name__ == "__main__":
    generate_config()