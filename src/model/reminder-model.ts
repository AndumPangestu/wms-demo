export type ReminderResponse = {
    code: string | null;
    description: string | null;
    specification: string | null;
    pr_status: string | null;
    pr_date: Date | null;
    po_status: string | null;
    po_date: Date | null;
}


export type SearchReminderRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
}

export function toReminderResponse(reminder: any): ReminderResponse {
    return {
        code: reminder.code,
        description: reminder.description,
        specification: reminder.specification,
        pr_status: reminder.pr_status ?? null,
        pr_date: reminder.pr_date ?? null,
        po_status: reminder.po_status ?? null,
        po_date: reminder.po_date ?? null
    }
}
