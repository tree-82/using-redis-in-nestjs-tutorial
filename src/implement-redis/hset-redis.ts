import { Injectable, Inject } from "@nestjs/common";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { RedisStore } from "cache-manager-redis-store";

@Injectable()
export class MyService {
    private readonly redisStore!: RedisStore;
        constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {
            this.redisStore = cache.store as unknown as RedisStore;
        }
}