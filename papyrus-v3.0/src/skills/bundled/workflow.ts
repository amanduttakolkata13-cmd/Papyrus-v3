// Papyrus Workflow Skill - Plan/Audit/Build/Review Pipeline
// This skill provides structured development workflows for Papyrus v3.0

import { registerBundledSkill } from '../bundledSkills.js'

const USAGE_MESSAGE = `Usage: /workflow [goal]

Execute a structured Plan-Audit-Build-Review pipeline.

Steps:
  1. GATE   — Validate prerequisites (git status, dependencies, disk space)
  2. PLAN   — Analyze goal and generate a structured implementation plan
  3. AUDIT  — Validate plan against project rules and security policies
  4. BUILD  — Execute plan step by step with progress tracking
  5. REVIEW — Evaluate output quality against the original goal

Examples:
  /workflow Add user authentication to the API
  /workflow Fix the memory leak in the WebSocket handler
  /plan Refactor the database module
  /audit Check the new endpoints for security issues
  /review Verify the test coverage for the payment module`

function buildWorkflowPrompt(args: string): string {
  return `# /workflow — Papyrus Structured Development Pipeline

You are executing the Papyrus workflow pipeline. Follow these steps in order:

## 1. GATE — Prerequisites Check
Before starting, verify:
- Git working tree is clean (or warn about uncommitted changes)
- Dependencies are installed (\`bun install\` / \`npm install\`)
- Sufficient disk space for builds
- Target files/directories exist
- Any required environment variables are set

If prerequisites fail, inform the user and stop.

## 2. PLAN — Implementation Plan
Analyze the goal and create a structured plan:
- Break the goal into discrete, ordered steps
- Identify files that need to be created or modified
- List dependencies between steps
- Estimate complexity for each step
- Identify potential risks or edge cases

Present the plan in a numbered checklist format.

## 3. AUDIT — Rule Validation
Validate the plan against project rules:
- Check for security concerns (no hardcoded secrets, no eval(), no SQL injection)
- Verify the plan follows project conventions (file naming, code style)
- Check for potential breaking changes
- Ensure test coverage is planned for new code
- Verify no unnecessary files are created

Flag any issues as BLOCK (must fix) or WARN (should address).

## 4. BUILD — Execute
Execute the plan step by step:
- Mark each step as you complete it
- Create git checkpoints at logical boundaries
- Write tests alongside implementation
- Handle errors gracefully — if a step fails, diagnose and fix before continuing
- Keep the user informed of progress

## 5. REVIEW — Quality Check
After building, verify the result:
- Run the test suite and report results
- Check that the original goal is fully addressed
- Verify no regressions were introduced
- Summarize all changes made
- Report any remaining TODOs or follow-up items

## Goal

${args}

Execute the pipeline now, starting with the GATE step.`
}

function buildPlanPrompt(args: string): string {
  return `# /plan — Implementation Planning

Create a detailed implementation plan for the following goal. Break it into
numbered, ordered steps. For each step, specify which files to modify or create.

Focus on:
- Correct ordering (dependencies first)
- Minimal changes (don't over-engineer)
- Clear acceptance criteria per step

## Goal

${args}`
}

function buildAuditPrompt(args: string): string {
  return `# /audit — Security & Quality Audit

Review the current codebase changes for security and quality issues.

Check for:
- Hardcoded secrets or credentials
- eval(), exec(), or other dangerous function usage
- SQL injection vectors
- XSS vulnerabilities
- Missing input validation
- Incomplete error handling
- Missing or inadequate tests
- Code that doesn't match project conventions

${args ? `Focus area: ${args}` : 'Focus on uncommitted changes (git diff).'}

Report issues as BLOCK (must fix before merge) or WARN (should fix).`
}

function buildReviewPrompt(args: string): string {
  return `# /review — Quality Review

Review the current work against its stated goal. Verify:

1. The goal is fully addressed
2. Tests pass
3. No regressions introduced
4. Code is clean and follows conventions
5. Documentation is updated if needed

${args ? `Review context: ${args}` : 'Review uncommitted changes.'}

Provide a pass/fail verdict with specific findings.`
}

export function registerWorkflowSkill(): void {
  registerBundledSkill({
    name: 'workflow',
    description:
      'Execute a structured Plan-Audit-Build-Review pipeline (e.g. /workflow Add auth to API)',
    whenToUse:
      'When the user wants to execute a structured development workflow with planning, auditing, building, and review stages.',
    argumentHint: '<goal>',
    userInvocable: true,
    isEnabled: () => true,
    async getPromptForCommand(args) {
      const trimmed = args.trim()
      if (!trimmed) {
        return [{ type: 'text', text: USAGE_MESSAGE }]
      }
      return [{ type: 'text', text: buildWorkflowPrompt(trimmed) }]
    },
  })

  registerBundledSkill({
    name: 'plan',
    description:
      'Create a detailed implementation plan for a goal (e.g. /plan Refactor database module)',
    whenToUse:
      'When the user wants to plan an implementation before building.',
    argumentHint: '<goal>',
    userInvocable: true,
    isEnabled: () => true,
    async getPromptForCommand(args) {
      const trimmed = args.trim()
      if (!trimmed) {
        return [{ type: 'text', text: USAGE_MESSAGE }]
      }
      return [{ type: 'text', text: buildPlanPrompt(trimmed) }]
    },
  })

  registerBundledSkill({
    name: 'audit',
    description:
      'Audit code for security and quality issues (e.g. /audit, /audit check auth module)',
    whenToUse:
      'When the user wants to check code for security vulnerabilities, quality issues, or rule violations.',
    argumentHint: '[focus area]',
    userInvocable: true,
    isEnabled: () => true,
    async getPromptForCommand(args) {
      return [{ type: 'text', text: buildAuditPrompt(args.trim()) }]
    },
  })

  registerBundledSkill({
    name: 'review',
    description:
      'Review work quality against a goal (e.g. /review, /review verify auth tests)',
    whenToUse:
      'When the user wants a quality review of current work or changes.',
    argumentHint: '[context]',
    userInvocable: true,
    isEnabled: () => true,
    async getPromptForCommand(args) {
      return [{ type: 'text', text: buildReviewPrompt(args.trim()) }]
    },
  })
}
