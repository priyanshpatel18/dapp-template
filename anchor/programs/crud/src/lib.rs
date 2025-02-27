use anchor_lang::prelude::*;

declare_id!("FPHQ1sMbRbHyJuBDHwYU8q15W4FdFQT1Zvc3LVsgwYYK");

#[program]
pub mod crud {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let account = &mut ctx.accounts.crud_account;
        account.authority = *ctx.accounts.signer.key;
        account.data = "Hello, Solana!".to_string();
        msg!("Account initialized: {}", account.data);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 8 + 32 + 100)]
    pub crud_account: Account<'info, CrudAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct CrudAccount {
    pub authority: Pubkey,
    pub data: String,
}
