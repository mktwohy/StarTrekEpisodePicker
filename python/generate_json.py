import requests
import stapi
import json
import time
from typing import List
from pathlib import Path


client = stapi.RestClient()
output_path = Path.cwd().parent / 'json' / 'episodes.json'


def search_episodes(page_number: int = 0, remove_keys: List[str] = ()) -> dict:
    criteria = stapi.rest_client.EpisodeSearchCriteria(pageNumber=page_number, pageSize=50, sort=None)
    response = client.episode.search(criteria)
    for key in remove_keys:
        for e in response['episodes']:
            del e[key]
    return response


def main():
    total_pages = search_episodes()['page']['totalPages']
    remove_keys = ['titleGerman', 'titleItalian', 'titleJapanese', 'productionSerialNumber', 'finalScriptDate']
    episodes = []

    for page_number in range(0, total_pages):
        episodes.extend(search_episodes(page_number, remove_keys)['episodes'])
        print(f'downloaded {page_number + 1}/{total_pages} pages')
        time.sleep(1)

    with open(output_path, 'w') as f:
        json.dump(episodes, f, indent=2)


if __name__ == '__main__':
    main()
