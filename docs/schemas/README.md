# README

## Top-level Schemas

-   [Actor](./actor.md "Actors are humans or non-humans that perform actions") – `https://platform.codeclimate.com/schemas/actor`
-   [CoverageTotals](./coveragetotals.md "Information about test coverage of a commit") – `https://platform.codeclimate.com/schemas/coverage-totals`
-   [DeliveryBuild](./deliverybuild.md "A Build run within a CI system") – `https://platform.codeclimate.com/schemas/delivery-build`
-   [DeliveryJob](./deliveryjob.md "A Job that ran as part of a Build") – `https://platform.codeclimate.com/schemas/delivery-job`
-   [DeliveryWorkflow](./deliveryworkflow.md "A configuration for running a Build within a CI system") – `https://platform.codeclimate.com/schemas/delivery-workflow`
-   [FileCoverage](./filecoverage.md "Information about test coverage of a file within a commit") – `https://platform.codeclimate.com/schemas/file-coverage`
-   [Incident](./incident.md "Incidents are a normalized, de-duplicated event") – `https://platform.codeclimate.com/schemas/incident`
-   [Repository](./repository.md "A code repository") – `https://platform.codeclimate.com/schemas/repository`
-   [Stream](./stream.md "Streams are data sources that can be subscribed to") – `https://platform.codeclimate.com/schemas/stream`
-   [TestResult](./testresult.md "The result of a test from a Build") – `https://platform.codeclimate.com/schemas/test-result`
-   [TestResultTotals](./testresulttotals.md "The result of a test from a Build") – `https://platform.codeclimate.com/schemas/test-result-totals`

## Other Schemas

### Objects

-   [DeliveryWorkflow](./deliverybuild-properties-workflow-oneof-deliveryworkflow.md "A configuration for running a Build within a CI system") – `https://platform.codeclimate.com/schemas/delivery-workflow#/properties/workflow/oneOf/1`
-   [Repository](./coveragetotals-properties-repository-oneof-repository.md "A code repository") – `https://platform.codeclimate.com/schemas/repository#/properties/repository/oneOf/1`
-   [Untitled object in Repository](./repository-properties-owner.md "The owning entity of the repository - usually an organization or a user") – `https://platform.codeclimate.com/schemas/repository#/properties/owner`
-   [Untitled object in Repository](./repository-properties-owner.md "The owning entity of the repository - usually an organization or a user") – `https://platform.codeclimate.com/schemas/repository#/properties/owner`

### Arrays

-   [Untitled array in FileCoverage](./filecoverage-properties-linehits.md "The number of hits on each line in the file, starting with line 1") – `https://platform.codeclimate.com/schemas/file-coverage#/properties/lineHits`
-   [Untitled array in Repository](./repository-properties-languages.md "Languages used in this array") – `https://platform.codeclimate.com/schemas/repository#/properties/languages`
-   [Untitled array in Repository](./repository-properties-languages.md "Languages used in this array") – `https://platform.codeclimate.com/schemas/repository#/properties/languages`

## Version Note

The schemas linked above follow the JSON Schema Spec version: `http://json-schema.org/draft-07/schema#`
