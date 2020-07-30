#!/bin/bash -e

LAMBDA_FUNCTIONS=$(aws lambda list-functions)

REACT_APP_OPTIMAL_LINEUP_LAMBDA=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetOptimalLineupFunction"))' | jq '.FunctionName')
REACT_APP_FANDUEL_LAMBDA=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetFanduelDataFunction"))' | jq '.FunctionName')
REACT_APP_DRAFTKINGS_LAMBDA=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetDraftKingsDataFunction"))' | jq '.FunctionName')
REACT_APP_PROJECTIONS_LAMBDA=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetProjectionsDataFunction"))' | jq '.FunctionName')
REACT_APP_OPPONENT_RANKS_LAMBDA=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetOpponentRanksDataFunction"))' | jq '.FunctionName')
REACT_APP_INJURIES_LAMBDA=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetInjuryDataFunction"))' | jq '.FunctionName')
REACT_APP_GOALIE_SCRAPER_LAMBDA=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GoalieScraperFunction"))' | jq '.FunctionName')
REACT_APP_ROLLING_FANTASY_AVERAGES_LAMBDA=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("GetRollingFantasyPoint"))' | jq '.FunctionName')
REACT_APP_RETRIEVE_FROM_S3_LAMBDA=$(echo "$LAMBDA_FUNCTIONS" | jq -r '.Functions[] | select(.FunctionName | contains("RetrieveFromS3Function"))' | jq '.FunctionName')

{
  echo "REACT_APP_AWS_KEY=$AWS_ACCESS_KEY_ID"
  echo "REACT_APP_AWS_SECRET=$AWS_SECRET_ACCESS_KEY"
  echo "REACT_APP_OPTIMAL_LINEUP_LAMBDA=$REACT_APP_OPTIMAL_LINEUP_LAMBDA"
  echo "REACT_APP_FANDUEL_LAMBDA=$REACT_APP_FANDUEL_LAMBDA"
  echo "REACT_APP_DRAFTKINGS_LAMBDA=$REACT_APP_DRAFTKINGS_LAMBDA"
  echo "REACT_APP_PROJECTIONS_LAMBDA=$REACT_APP_PROJECTIONS_LAMBDA"
  echo "REACT_APP_OPPONENT_RANKS_LAMBDA=$REACT_APP_OPPONENT_RANKS_LAMBDA"
  echo "REACT_APP_INJURIES_LAMBDA=$REACT_APP_INJURIES_LAMBDA"
  echo "REACT_APP_GOALIE_SCRAPER_LAMBDA=$REACT_APP_GOALIE_SCRAPER_LAMBDA"
  echo "REACT_APP_ROLLING_FANTASY_AVERAGES_LAMBDA=$REACT_APP_ROLLING_FANTASY_AVERAGES_LAMBDA"
  echo "REACT_APP_RETRIEVE_FROM_S3_LAMBDA=$REACT_APP_RETRIEVE_FROM_S3_LAMBDA"
} >> ./.env

cat ./.env
