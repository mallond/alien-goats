#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, token, Address, Env};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,
    Token,
    MaxPerReward,
    Initialized,
}

#[contract]
pub struct RewardController;

#[contractimpl]
impl RewardController {
    pub fn init(env: Env, admin: Address, token_id: Address, max_per_reward: i128) {
        if env.storage().instance().has(&DataKey::Initialized) {
            panic!("already initialized");
        }
        if max_per_reward <= 0 {
            panic!("max_per_reward must be > 0");
        }

        admin.require_auth();

        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::Token, &token_id);
        env.storage().instance().set(&DataKey::MaxPerReward, &max_per_reward);
        env.storage().instance().set(&DataKey::Initialized, &true);
    }

    pub fn admin(env: Env) -> Address {
        env.storage().instance().get(&DataKey::Admin).unwrap()
    }

    pub fn token(env: Env) -> Address {
        env.storage().instance().get(&DataKey::Token).unwrap()
    }

    pub fn max_per_reward(env: Env) -> i128 {
        env.storage().instance().get(&DataKey::MaxPerReward).unwrap()
    }

    pub fn set_max_per_reward(env: Env, new_max: i128) {
        if new_max <= 0 {
            panic!("new_max must be > 0");
        }

        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();

        env.storage().instance().set(&DataKey::MaxPerReward, &new_max);
    }

    pub fn reward(env: Env, to: Address, amount: i128) {
        if amount <= 0 {
            panic!("amount must be > 0");
        }

        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        let token_id: Address = env.storage().instance().get(&DataKey::Token).unwrap();
        let max_per_reward: i128 = env.storage().instance().get(&DataKey::MaxPerReward).unwrap();

        if amount > max_per_reward {
            panic!("amount exceeds max_per_reward");
        }

        admin.require_auth();

        let token_client = token::Client::new(&env, &token_id);
        token_client.transfer(&admin, &to, &amount);
    }
}
