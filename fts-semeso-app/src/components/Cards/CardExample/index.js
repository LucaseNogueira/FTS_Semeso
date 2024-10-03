function CardExample({title, subtitle, description, link = "", pubdate = ""}){
    return (
        <div className="card float-end mb-3">
            <div className="card-body"> 
                <h5 className="card-title">{title}</h5> 
                <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
                <p className="card-text">{description}</p>
            </div>
            <div className="card-footer">
                <div className="row">
                    <div className="col-11">
                        <a href="/" className="card-link" target="_blank" rel="noreferrer">{link}</a>
                    </div>
                    <div className="col-1"> 
                        <span className="text-muted float-end">{pubdate}</span>
                    </div>
                </div> 
            </div> 
        </div>
    );
};

export default CardExample;