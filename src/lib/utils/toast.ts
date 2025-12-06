import { ToastVanilla } from 'toast-vanilla';

export const toast = new ToastVanilla({
  position: 'top-left',
  maxItemToRender: 3,
  styles: {
    background: 'var(--background)',
    border: 'var(--border)',
    primaryTextColor: 'var(--foreground)',
    secondaryTextColor: 'var(--muted-foreground)',
    strokeColor: 'var(--accent)',
    strokeColorForeground: 'var(--accent-foreground)',
    successColor: 'var(--success)',
    errorColor: 'var(--destructive)',
    warningColor: 'var(--warning)',
    infoColor: 'var(--info)',
  },
});
