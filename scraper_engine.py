
import requests
from bs4 import BeautifulSoup
import json

def run_nexus_scraper():
    url = "https://internshala.com/internships/computer%20science-internship"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.11'}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    container = soup.find_all('div', attrs={"class": "individual_internship"})
    
    live_leads = []
    keywords = ['python', 'web', 'developer', 'engineer', 'software', 'data', 'java', 'frontend', 'backend']

    for item in container:
        try:
            link_tag = item.find('a')
            title = link_tag.text.strip() if link_tag else "Unknown Role"
            company_tag = item.find('div', class_="company_name") or item.find('a', class_="company_name")
            company = company_tag.text.strip() if company_tag else "Unknown Company"

            if any(key in title.lower() for key in keywords):
                live_leads.append({
                    "id": len(live_leads) + 1,
                    "title": title,
                    "company": company,
                    "stipend": item.find('span', class_="stipend").text.strip() if item.find('span', class_="stipend") else "TBD",
                    "link": "https://internshala.com" + link_tag['href'],
                    "source": "Internshala"
                })
        except: continue

    with open("live_projects.json", "w") as f:
        json.dump(live_leads, f, indent=4)

if __name__ == "__main__":
    run_nexus_scraper()
