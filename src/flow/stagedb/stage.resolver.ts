import { Args, InputType, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { StagedbService } from './stagedb.service'
import { Stage, StageInput } from './stage.graphql.model'

@Resolver(of => Stage)
export class StageResolver {
    constructor(
        private stageDbService: StagedbService
    ) { }

    @Query(returns => Stage, { description: "returns a Stage with a given ID" })
    async getStageById(@Args('id', { type: () => String }) id: string) {
        return this.stageDbService.getById(id)
    }

    @Query(returns => [Stage], { description: "returns all Stages" })
    async getAllStages() {
        return this.stageDbService.getAll()
    }

    @Mutation(returns => Stage, { description: "creates a Stage and returns the response" })
    async createStage(@Args('Stage', { type: () => StageInput }) Stage: StageInput) {
        return this.stageDbService.save(Stage)
    }



}