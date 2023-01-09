import requests
import stapi
import json
import time
from typing import List
from pathlib import Path


client = stapi.RestClient()


def remove_unwanted_keys(response, content_key, unwanted_keys):
    for key in unwanted_keys:
        for entry in response[content_key]:
            del entry[key]


def download_episode_page(page_number: int, unwanted_keys: List[str] = ()) -> dict:
    criteria = stapi.rest_client.EpisodeSearchCriteria(pageNumber=page_number, pageSize=50, sort=None)
    response = client.episode.search(criteria)
    content_key = 'episodes'
    remove_unwanted_keys(response, content_key, unwanted_keys)
    return response


def download_season_page(page_number: int, unwanted_keys: List[str] = ()) -> dict:
    criteria = stapi.rest_client.SeasonSearchCriteria(pageNumber=page_number, pageSize=50, sort=None)
    response = client.season.search(criteria)
    content_key = 'seasons'
    remove_unwanted_keys(response, content_key, unwanted_keys)
    return response


def download_series_page(page_number: int, unwanted_keys: List[str] = ()) -> dict:
    criteria = stapi.rest_client.SeriesSearchCriteria(pageNumber=page_number, pageSize=50, sort=None)
    response = client.series.search(criteria)
    content_key = 'series'
    remove_unwanted_keys(response, content_key, unwanted_keys)
    return response


def download_json(content_key: str, unwanted_keys: list, download_page_func) -> list:
    page_count = download_page_func(page_number=0)['page']['totalPages']
    episodes = []

    for page_number in range(0, page_count):
        page = download_page_func(page_number, unwanted_keys)
        episodes.extend(page[content_key])
        print(f'downloaded {content_key} page {page_number + 1}/{page_count}')
        time.sleep(1)

    return episodes


def write_json(path, content: list):
    with open(path, 'w') as f:
        json.dump(content, f, indent=2)


def main():
    output_dir = Path.cwd().parent / 'json'
    episode_unwanted_keys = ['titleGerman', 'titleItalian', 'titleJapanese', 'productionSerialNumber', 'finalScriptDate']
    season_unwanted_keys = []
    series_unwanted_keys = ['productionCompany', 'originalBroadcaster']

    write_json(
        path=output_dir/'episodes.json',
        content=download_json('episodes', episode_unwanted_keys, download_episode_page)
    )
    write_json(
        path=output_dir/'seasons.json',
        content=download_json('seasons', season_unwanted_keys, download_season_page)
    )
    write_json(
        path=output_dir/'series.json',
        content=download_json('series', series_unwanted_keys, download_series_page)
    )


if __name__ == '__main__':
    main()
