# Papyrus v3.0

**Papyrus** is a Claude Code-style AI coding agent CLI with multi-provider support. Forked from OpenClaude, it works with Anthropic, OpenAI, Gemini, DeepSeek, Ollama, and 200+ LLM providers — giving you a Claude Code-like TUI experience with any model you choose.

## Features

- **Multi-Provider Support** — Anthropic, OpenAI, Gemini, DeepSeek, Ollama, Codex, Bedrock, Vertex, OpenRouter, Together AI, Groq, Mistral, LM Studio, and more
- **50+ Built-in Tools** — File read/write/edit, bash/shell, glob, grep, web search, MCP servers, agent spawning, git operations, notebook editing, LSP integration, and more
- **Claude Code TUI** — Full terminal UI with streaming responses, syntax highlighting, permission prompts, and keyboard shortcuts
- **Real-time Streaming** — Live token streaming with thinking/reasoning display
- **Permission Modes** — `readonly`, `workspace`, and `full` modes to control what the agent can do
- **Session Management** — Resume conversations, background sessions, and session history
- **Workflow Pipeline** — Built-in Plan-Audit-Build-Review pipeline for structured development
- **MCP Server Support** — Connect to Model Context Protocol servers for extended capabilities
- **Agent Swarming** — Spawn specialized sub-agents for research, exploration, and verification
- **Zero Telemetry** — No analytics, no phone-home, no tracking by default

## Quick Start

### 1. Install Dependencies

```bash
# Install Bun runtime (if not already installed)
curl -fsSL https://bun.sh/install | bash

# Install project dependencies
cd papyrus-v3.0
bun install
```

### 2. Set API Key

```bash
# For Anthropic (default)
export ANTHROPIC_API_KEY="sk-ant-..."

# OR for OpenAI
export OPENAI_API_KEY="sk-..."
export CLAUDE_CODE_USE_OPENAI=1

# OR for Gemini
export GEMINI_API_KEY="AIza..."
export CLAUDE_CODE_USE_GEMINI=1

# For Ollama (no API key needed, just run Ollama locally)
export CLAUDE_CODE_USE_OPENAI=1
export OPENAI_BASE_URL="http://localhost:11434/v1"
export OPENAI_MODEL="llama3.1:8b"
```

### 3. Run

```bash
# Build and run
bun run build
bun run dev

# Or use the --provider flag
bun run dev -- --provider openai --model gpt-4o
bun run dev -- --provider gemini --model gemini-2.0-flash
bun run dev -- --provider ollama --model llama3.2
```

## Provider Setup

| Provider | API Key Env Var | Additional Env Vars | Example |
|---|---|---|---|
| **Anthropic** | `ANTHROPIC_API_KEY` | _(none)_ | Default provider |
| **OpenAI** | `OPENAI_API_KEY` | `CLAUDE_CODE_USE_OPENAI=1` | GPT-4o, GPT-5 |
| **Google Gemini** | `GEMINI_API_KEY` | `CLAUDE_CODE_USE_GEMINI=1` | Gemini 2.0 Flash |
| **Ollama (local)** | _(none)_ | `CLAUDE_CODE_USE_OPENAI=1` + `OPENAI_BASE_URL=http://localhost:11434/v1` | Llama, Mistral, Qwen |
| **OpenRouter** | `OPENAI_API_KEY` | `OPENAI_BASE_URL=https://openrouter.ai/api/v1` | Any model via OpenRouter |
| **DeepSeek** | `OPENAI_API_KEY` | `OPENAI_BASE_URL=https://api.deepseek.com` | DeepSeek V3, Coder |
| **Together AI** | `OPENAI_API_KEY` | `OPENAI_BASE_URL=https://api.together.xyz/v1` | Llama, Qwen, more |
| **Groq** | `OPENAI_API_KEY` | `OPENAI_BASE_URL=https://api.groq.com/openai/v1` | Llama, Mixtral |
| **Mistral** | `OPENAI_API_KEY` | `OPENAI_BASE_URL=https://api.mistral.ai/v1` | Mistral Large, Medium |
| **Codex** | `CODEX_API_KEY` | `CHATGPT_ACCOUNT_ID=...` | Codex Plan/Spark |
| **Bedrock** | AWS credentials | `CLAUDE_CODE_USE_BEDROCK=1` | Anthropic on AWS |
| **Vertex AI** | Google credentials | `CLAUDE_CODE_USE_VERTEX=1` | Anthropic on GCP |
| **GitHub Models** | `GITHUB_TOKEN` | `CLAUDE_CODE_USE_GITHUB=1` | GPT-4o, Claude via GitHub |

### Provider Profiles

Save your provider configuration for quick switching:

```bash
# Interactive provider setup
papyrus --provider

# Or use the dev scripts
bun run profile:init -- --provider openai --model gpt-4o
bun run profile:init -- --provider ollama --model llama3.2
bun run profile:auto  # Auto-detect and recommend
```

This creates a `.papyrus-profile.json` in your working directory.

## Available Slash Commands

| Command | Description |
|---|---|
| `/help` | Show help and available commands |
| `/provider` | Configure LLM provider interactively |
| `/commit` | Create a git commit with AI-generated message |
| `/diff` | Show diff of changes |
| `/review` | Review current changes |
| `/status` | Show session status |
| `/clear` | Clear conversation history |
| `/compact` | Compact/summarize conversation |
| `/model` | Switch or configure model |
| `/permissions` | Change permission mode |
| `/config` | Edit configuration |
| `/workflow` | Run Plan-Audit-Build pipeline |
| `/plan` | Plan mode for structured tasks |
| `/audit` | Audit code against rules |
| `/bughunter` | Scan for potential bugs |
| `/issue` | Report a model issue |
| `/tasks` | Manage task list |
| `/dream` | Background autonomous tasks |

## Configuration Files

| File | Location | Purpose |
|---|---|---|
| `papyrus.yaml` | Project root | Main configuration (provider, permissions, workflow, rules) |
| `settings.json` | Project root | UI settings (theme, keybindings, display) |
| `.papyrus-profile.json` | Project root | Saved provider credentials and model selection |
| `CLAUDE.md` | Project root | Project instructions loaded into system prompt (inherited from Claude Code) |
| `~/.papyrus/` | Home directory | Global config, sessions, memory |

### papyrus.yaml

See `papyrus.yaml.example` for a full example configuration file covering provider settings, permission modes, workflow pipelines, audit rules, and display preferences.

### Environment Variables

| Variable | Description |
|---|---|
| `PAPYRUS_API_KEY` | Default API key |
| `CLAUDE_CODE_USE_OPENAI` | Enable OpenAI-compatible provider |
| `CLAUDE_CODE_USE_GEMINI` | Enable Gemini provider |
| `CLAUDE_CODE_USE_BEDROCK` | Enable Bedrock provider |
| `CLAUDE_CODE_USE_VERTEX` | Enable Vertex AI provider |
| `OPENAI_API_KEY` | OpenAI-compatible API key |
| `OPENAI_BASE_URL` | Custom API base URL |
| `OPENAI_MODEL` | Model name override |
| `PAPYRUS_DISABLE_CO_AUTHORED_BY` | Disable git co-authored-by trailer |
| `PAPYRUS_ENABLE_EXTENDED_KEYS` | Enable extended terminal key support |

## Development

```bash
# Build
bun run build

# Run in development
bun run dev

# Run with specific provider
bun run dev:openai
bun run dev:gemini
bun run dev:ollama

# Run tests
bun test

# Type checking
bun run typecheck

# Security/privacy verification
bun run verify:privacy

# Full hardening check
bun run hardening:strict
```

## Architecture

Papyrus is built on top of the Claude Code codebase with these modifications:

- **Provider abstraction layer** — Routes API calls through OpenAI-compatible chat completions for any provider
- **Provider profiles** — Save and switch between provider configurations
- **No telemetry** — All analytics/telemetry modules replaced with no-op stubs at build time
- **Internal feature gating** — Anthropic-internal features (daemon, bridge, etc.) disabled by default
- **Custom identity** — Branded as Papyrus throughout the UI and system prompts

## License

See [LICENSE](LICENSE) for details.

Papyrus is an independent community project. "Claude" and "Claude Code" are trademarks of Anthropic PBC.
