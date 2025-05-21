export interface ActionType{
  value: string;
  label: string;
}

export const ROLE_BASED_ACTION_TYPE_OPTIONS: { [key: string]: ActionType[] } = {
  VIP_Assigner: [
    { value: 'final_reply', label: 'Final Draft Reply' },
    { value: 'forward_for_reply', label: 'Forward For Reply' }
  ],
  VIP_Assignee: [
    { value: 'forward_for_reply', label: 'Forward For Reply' },
    { value: 'draft_reply', label: 'Draft Reply' }
  ]
};